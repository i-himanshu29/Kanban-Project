import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getProfile,
  resendVerificationEmail,
  forgotPasswordRequest,
  VerifyEmail,
} from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { verifyJWT } from "../middlewares/verifyJwt.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
  userLoginValidator,
  userRegistrationValidator,
  resetPasswordValidator,
  updateProfileValidator,
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
} from "../validators/auth.validators.js";

const router = Router();

router
  .route("/register")
  .post(
    upload.single("avatar"),
    userRegistrationValidator(),
    validate,
    registerUser,
  );

router.route("/login").get(userLoginValidator(), validate, loginUser);//factory pattern
router.route("/verify/:token").get(verifyJWT, VerifyEmail);
router.route("/resend-mail").get(verifyJWT, resendVerificationEmail);
router.route("/refresh-token").post(refreshAccessToken);
router
  .route("/forgot-password")
  .get(
    verifyJWT,
    userForgotPasswordValidator(),
    validate,
    forgotPasswordRequest,
  );
// router
//   .route("/reset-password/:token")
//   .get(verifyJWT, resetPasswordValidator(), validate, resetPassword);
router
  .route("/change-password")
  .get(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword,
  );
router.route("/getMe").get(verifyJWT, getProfile);

router.route("/logout").get(verifyJWT, logoutUser);

export default router;

// Once you form teams for project, share your
//  Team name & discord usernames of the members with me
