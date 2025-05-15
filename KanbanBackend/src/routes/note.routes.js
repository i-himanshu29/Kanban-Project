import { Router } from "express";
import { verifyJWT } from "../middlewares/verifyJwt.middleware";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers";

const router = Router();

router.route("/create").post(verifyJWT, createNote); // create a new note

router.route("/notes").get(verifyJWT, getNotes); // get all notes

router.route("/notes/:id").get(verifyJWT, getNoteById); // get note by id

router.route("/update/:id").put(verifyJWT, updateNote); // update note

router.route("/delete/:id").delete(verifyJWT, deleteNote); //delete note

export default router;
