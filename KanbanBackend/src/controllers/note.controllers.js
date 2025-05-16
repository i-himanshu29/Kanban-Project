import mongoose from "mongoose";
import { ProjectNote } from "../models/note.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.model.js";

// get notes .....................................................
const getNotes = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  const project = await Project.findById(projectId); // project->mongoose

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  const notes = await ProjectNote.find({
    project: new mongoose.Types.ObjectId(projectId),
  }).populate("createdBy", "username fullName avatar");

  // If no notes are found, throw a 404 errro
  if (!notes) {
    throw new ApiError(404, "No notes found for the current user.");
  }

  // Return the fetched notes in the response
  res
    .status(200)
    .json(new ApiResponse(200, "Notes fetched successfully.", notes));
});

// get note by id.................................................
const getNoteById = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  // Fetch the note by ID
  const note = await ProjectNote.findById(noteId).populate(
    "createdBy",
    "username fullName avatar",
  );

  // If no note is found, throw an error
  if (!note) {
    throw new ApiError(404, "note not found.");
  }

  // Return the note in the response
  res
    .status(200)
    .json(new ApiResponse(200, note, "note fetched successfully."));
});

// create note ...................................................
const createNote = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const { content } = req.body;

  const project = await Project.findById(projectId);

  // If Project not found
  if (!project) {
    throw new ApiError(400, "Project not found.");
  }

  const note = await ProjectNote.create({
    project: new mongoose.Types.ObjectId(projectId),
    content,
    createdBy: new mongoose.Types.ObjectId(req.user._id),
  });

  const populatedNote = await ProjectNote.findById(note._id).populate(
    "createdBy",
    "username fullName avatar",
  );

  // Return success response
  res
    .status(200)
    .json(new ApiResponse(200, populatedNote, "Note created successfully."));
});

// update note ...................................................
const updateNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  const { content } = req.body;

  const existingNote = ProjectNote.findById(noteId);

  // if note not exists
  if (!existingNote) {
    throw new ApiError(404, "Note not found");
  }

  const note = await ProjectNote.findByIdAndUpdate(
    noteId,
    { content },
    { new: true },
  ).populate("createBy", "username fullName avatar");

  res
    .status(200)
    .json(new ApiResponse(200, note, "Note updated successfully.", note));
});

// delete note ...................................................
const deleteNote = asyncHandler(async (req, res) => {
  const { noteId } = req.params;

  // Find and delete the note
  const note = await ProjectNote.findByIdAndDelete(noteId);

  // Check if the note was found
  if (!note) {
    throw new ApiError(404, " Note not found");
  }

  // Return success response
  res.status(200).json(new ApiResponse(200, note, "Note deleted successfully"));
});

export { createNote, deleteNote, getNoteById, getNotes, updateNote };
