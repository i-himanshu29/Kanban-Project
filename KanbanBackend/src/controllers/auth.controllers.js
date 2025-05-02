import { asyncHandler } from "../utils/async-handler.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-error.js";
import {
  sendEmail,
  emailVerificationMailgenContent,
  forgotPasswordMailgenContent,
} from "../utils/mail.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateRefreshAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token ",
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // 1.get data from req body
  //2. Validate the data
  //3.check if user already present from email
  //4.create a user in db
  //5.if not present
  //6.create verification token
  //7.save token in the db
  //8.send token as email to user
  //9.send success status to user

  const { email, fullname, username, password } = req.body;

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fiels are required");
  }
  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      throw new ApiError(409, "User with email or username already exists");
    }

    const avatarLocalPath = req.file.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar Image is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);

    if (!avatar) {
      throw new ApiError(400, "Avatar file is required");
    }

    const user = await User.create({
      avatar: {
        url: avatar.url,
        localPath: avatarLocalPath,
      },
      email,
      username: username.toLowerCase(),
      fullname,
      password,
    });

    const token = user.generateTemporaryToken();

    user.emailVerificationToken = token.hashedToken;
    user.emailVerificationExpiry = token.tokenExpiry;

    await user.save();

    await sendEmail({
      email,
      subject: "Verify your Email",
      mailgenContent: emailVerificationMailgenContent(
        username,
        `${process.env.BASE_URL}/api/v1/users/verify/${token.unHashedToken}`,
      ),
    });

    const createUser = await User.findById(user._id).select(
      "-password -refreshToken",
    );

    if (!createUser) {
      throw new ApiError(
        "500",
        "Something went wrong while registering the user",
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createUser, "User Registered Successfully"));
  } catch (error) {
    throw new ApiError(
      error?.statusCode || 500,
      error?.message || "Internal Server Error",
    );
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password, username } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateRefreshAccessToken(
    user._id,
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200, // statuscode
        {
          user: loggedInUser,
          accessToken,
          refreshToken, // data part
        },
        "User logged In Successfully", //message
      ),
    );
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiResponse(401, "unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options) // options bhi paas karna padta hai
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"));
});

const VerifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.params;
  console.log(token);

  if (!token) {
    throw new ApiError(400, "Invalid Token");
  }

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      emailVerificationToken: hashedToken,
      emailVerificationExpiry: { $gt: Date.now() },
    });
    if (!user) {
      throw new ApiError(400, "Invalid token");
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    await user.save();

    return res
      .status(201)
      .json(new ApiResponse(200, user, "Email verified Successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(
      error.statusCode || 500,
      error?.message || "Internal Server Error",
    );
  }
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { _id, email } = req.user;
  try {
    const user = await User.findOne({ _id });

    if (!user) {
      throw new ApiError(404, "User Not Found");
    }
    const { unHashedToken, hashedToken, tokenExpiry } =
      user.generateTemporaryToken();
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;
    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: "Verify Your Email",
        mailGenContent: emailVerificationMailgenContent(
          user.username,
          `${process.env.BASE_URL}/api/v1/users/verify/${unHashedToken}`,
        ),
      });
    } catch (error) {
      throw new ApiError(
        error?.statusCode || 500,
        error?.message || "Something went wrong while sending mail",
      );
    }
    res
      .status(201)
      .json(new ApiResponse(201, user, "Email Verification Link Sent"));
  } catch (error) {
    throw new ApiError(500, "Internal Server Error");
  }
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User Email Doesn't Exist");
    }
    console.log(user);
    const { unHashedToken, hashedToken, tokenExpiry } =
      user.generateTemporaryToken();
    user.forgotPasswordToken = hashedToken;
    user.forgotPasswordExpiry = tokenExpiry;
    await user.save();

    try {
      sendEmail({
        email,
        subject: "Reset Password",
        mailGenContent: forgotPasswordMailgenContent(
          user.username,
          `${process.env.BASE_URL}/api/v1/users/reset-password/${unHashedToken}`,
        ),
      });
    } catch (error) {
      throw new ApiError(
        error?.statusCode || 500,
        error?.message || "Something went wrong while sending mail",
      );
    }
    res
      .status(201)
      .json(new ApiResponse(201, user, "Reset Password Link Sent"));
  } catch (error) {
    throw new ApiError(500, error?.message || "Internal Server Error");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old Password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false }); //validateBeforeSave

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password cannot be Password"));
});

const getProfile = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getProfile,
  resendVerificationEmail,
  forgotPasswordRequest,
  VerifyEmail,
};

// updateProfile
// updateAvatar
// deleteAvatar
// delete Account
// resetPassword
