import mongoose from "mongoose";
import { Task } from "../models/task.js";
import { Project } from "../models/project.js";
import { ApiError, ApiResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/async-handler.js";


// get all tasks..............................................
export const getTasks = asyncHandler(async (req, res, next) => {
  try {
    const { projectId } = req.params;

    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      throw new ApiError(400, "Invalid Project ID.");
    }

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      throw new ApiError(404, "Project not found.");
    }

    // Fetch tasks for the project
    const tasks = await Task.find({ project: projectId }).populate(
      "createdBy",
      "username fullName avatar"
    );

    // Handle no tasks found
    if (!tasks || tasks.length === 0) {
      throw new ApiError(404, "No tasks found for the current project.");
    }

    // Return tasks in the response
    res
      .status(200)
      .json(new ApiResponse(200, tasks, "Tasks fetched successfully."));
  } catch (error) {
    next(error); // Pass error to global error handler
  }
});

  
  // get task by id
  const getTaskById = async (req, res) => {
    // get task by id
    
  };
  

// Create Task .............................................
  export const createTask = async (req, res, next) => {
    try {
      // Extract data from request
      const { projectId } = req.params;
      const { title, description, assignedTo, assignedBy, status, attachments } = req.body;
  
      // Validate project existence
      const project = await Project.findById(projectId);
      if (!project) {
        throw new ApiError(400, "Project not found.");
      }
  
      // Create the task
      const task = await Task.create({
        project: projectId, // No need to create a new ObjectId
        title,
        description,
        assignedTo,
        assignedBy,
        status,
        attachments,
      });
  
      // Populate created task with user details
      const populatedTask = await Task.findById(task._id).populate(
        ["assignedTo", "assignedBy"],
        "username fullName avatar"
      );
  
      // Send success response
      res
        .status(200)
        .json(new ApiResponse(200, populatedTask, "Task created successfully."));
    } catch (error) {
      next(error); // Pass error to the global error handler
    }
  };
  
  // update task
  const updateTask = async (req, res) => {
    // update task
  };
  
  // delete task
  const deleteTask = async (req, res) => {
    // delete task
  };
  
  // create subtask
  const createSubTask = async (req, res) => {
    // create subtask
  };
  
  // update subtask
  const updateSubTask = async (req, res) => {
    // update subtask
  };
  
  // delete subtask
  const deleteSubTask = async (req, res) => {
    // delete subtask
  };
  
  export {
    createSubTask,
    createTask,
    deleteSubTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateSubTask,
    updateTask,
  };
  