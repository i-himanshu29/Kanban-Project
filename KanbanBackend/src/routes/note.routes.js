import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers";
import { validateProjectPermission } from "../middlewares/validator.middleware.js";
import { AvailableUseRole } from "../utils/constants.js ";


const router = Router();

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUseRole), getNotes)
  .post(validateProjectPermission([UserRolesEnum.ADMIN]), createNote); //, UserRoleEnum.MEMBER

router
  .route("/:projectId/n/:noteId")
  .get(validateProjectPermission(AvailableUseRole), getNoteById)
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateNote)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNote); // get note by id

export default router;
