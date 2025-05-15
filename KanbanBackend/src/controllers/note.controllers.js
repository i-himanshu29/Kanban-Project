
import { ProjectNote } from "../models/note.model.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler";



// get notes .....................................................
const getNotes = asyncHandler(async (req, res) => {
  // Get the user ID 
  const userId = req.user.id;

  // Fetch notes created by the user
  const notes = await ProjectNote.find({ createdBy: userId });

  // If no notes are found, throw a 404 error
  if (!notes || notes.length === 0) {
    throw new ApiError(404, "No notes found for the current user.");
  }

  // Return the fetched notes in the response
  res.status(200).json(new ApiResponse(200, "Notes fetched successfully.", notes));
});


// get note by id.................................................
const getNoteById = async (req, res) => {
  const { id } = req.params;

  // Fetch the note by ID
  const note = await ProjectNote.findById(id);

  // If no note is found, throw an error
  if (!note) {
    throw new ApiError(404, "note not found.");
  }

  // Return the note in the response
  res.status(200).json(new ApiResponse(200, "note fetched successfully.", note));
};
  

// create note ...................................................
const createNote = asyncHandler(async (req, res) => {
  const { project, content, createdBy } = req.body;

  // Validate required fields
  if (!project || !content || !createdBy) {
    throw new ApiError(400, "All fields are required.");
  }

  // Check if a note with the same content already exists for the project
  const existingNote = await ProjectNote.findOne({
    project,
    content,
  });

  if (existingNote) {
    throw new ApiError(409, "A note with the same content already exists for this project.");
  }

  // Create and save the note
  const note = new ProjectNote({
    project,
    content,
    createdBy,
  });

  await note.save();

  // Return success response
  res.status(201).json(new ApiResponse(201, "Note created successfully.", note));
});

  
// update note ...................................................
const updateNote = async (req, res) => {

  const {id}= req.params;

  const {project , content , createdBy} = req.body;

  if(!project || !content || !createdBy){
    throw new ApiError(400,"All fileds are required");
  }

  const note = await ProjectNote.findById(id);

  if(!note){
    throw new ApiError(404,"Note not found")
  }

  // update the note
  note.project = project;
  note.content = content;
  note.createdBy = createdBy;

  await note.save();

  // Return success response
  res.status(200).json(new ApiResponse(200, "Note updated successfully.", note));
};


// delete note ...................................................
const deleteNote = asyncHandler(async (req, res) => {

  const { id } = req.params;

  // Find and delete the note
  const result = await ProjectNote.deleteOne({ _id: id });

  // Check if the note was found and deleted
  if (result.deletedCount === 0) {
    throw new ApiError(404, " Note not found");
  }

  // Return success response
  res.status(200).json(new ApiResponse(200, "Note deleted successfully"));
});

  
export { createNote, deleteNote, getNoteById, getNotes, updateNote };
  