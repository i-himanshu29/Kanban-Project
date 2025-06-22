import { Project } from "../models/project.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";



// // with try-catch without asyncHandler
// const getProjects = async (req, res) => {
//   try {
//     // Assuming the user's ID is stored in `req.user.id` (via authentication middleware)
//     const userId = req.user.id;

//     // Fetch projects created by the user
//     const projects = await Project.find({ createdBy: userId });

//     // If no projects are found, return a 404 response
//     if (!projects || projects.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "You don't have any projects.",
//       });
//     }

//     // If projects are found, return them in the response
//     res.status(200).json({
//       success: true,
//       message: "Projects fetched successfully.",
//       data: projects,
//     });
//   } catch (error) {
//     console.error("Failed to get all projects:", error);

//     // Handle any unexpected errors
//     res.status(500).json({
//       success: false,
//       message: "Internal Server Error.",
//       error: error.message, // Include the error message for debugging
//     });
//   }
// };


// get all projects...............................................................
const getProjects = asyncHandler(async (req, res) => {

  // User's ID is stored in `req.user.id` via authentication middleware
  const userId = req.user.id;

  // Fetch projects created by the user
  const projects = await Project.find({ createdBy: userId });

  // If no projects are found, throw an ApiError
  if (!projects || projects.length === 0) {
    throw new ApiError(404, "You don't have any projects.");
  }

  // If projects are found, return them in the response
  res.status(200).json(new ApiResponse(200, "Projects fetched successfully.", projects));
});


// get project by Id .............................................................
const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  // Fetch the project by ID
  const project = await Project.findById(projectId);

  // If no project is found, throw an error
  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  // Return the project in the response
  res.status(200).json(new ApiResponse(200, "Project fetched successfully.", project));
});


// create project ................................................................
const createProject = asyncHandler(async (req, res) => {
  const { title, description, createdBy } = req.body;

  // Validate required fields
  if (!title || !description || !createdBy) {
    throw new ApiError(400, "All fields are required.");
  }

  // Check if a project with the same title or description exists
  const existingProject = await Project.findOne({
    $or: [{ title }, { description }],
  });

  if (existingProject) {
    throw new ApiError(409, "Project already exists.");
  }

  // Create and save the project
  const project = await Project.create({
    title,
    description,
    createdBy,
  });

  // Return success response
  res.status(201).json(new ApiResponse(201, "Project created successfully.", project));
});


// update project ................................................................
const updateProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { title, description, createdBy } = req.body;

  // Validate required fields
  if (!title || !description || !createdBy) {
    throw new ApiError(400, "All fields are required.");
  }

  // Check if the project exists
  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found.");
  }

  // Update the project
  project.title = title;
  project.description = description;
  project.createdBy = createdBy;

  // Save the updated project
  await project.save();

  // Return success response
  res.status(200).json(new ApiResponse(200, "Project updated successfully.", project));
});



// delete project ................................................................
const deleteProject = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  // Find and delete the project
  const result = await Project.deleteOne({ _id: projectId });

  // Check if the project was found and deleted
  if (result.deletedCount === 0) {
    throw new ApiError(404, "Project not found");
  }

  // Return success response
  res.status(200).json(new ApiResponse(200, "Project deleted successfully"));
});


// get project members ...........................................................
const getProjectMembers = async (req, res) => {
  // get project members
  // search project by id
  // count project member
  // return response
};


// add member to project...........................................................
const addMemberToProject = async (req, res) => {
  // add member to project
  // search project
  // add new count
  // update into db
  // return response
};


// delete project .................................................................
const deleteMember = async (req, res) => {
  // delete member from project
  // search project
  // remove particular member through id
  // update db
  // return response
};


// update Member role ..............................................................
const updateMemberRole = async (req, res) => {
  // update member role
  // search member
  // update role
  // save into db
  // return response
};

export {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
};
