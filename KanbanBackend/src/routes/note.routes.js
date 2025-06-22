import { Router } from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../controllers/note.controllers.js";
import { validateProjectPermission } from "../middlewares/validator.middleware.js";
import { AvailableUserRoles,UserRolesEnum } from "../utils/constants.js ";


const router = Router();

router
  .route("/:projectId")
  .get(validateProjectPermission(AvailableUserRoles), getNotes)
  .post(validateProjectPermission([UserRolesEnum.ADMIN]), createNote); //, UserRoleEnum.MEMBER

router
  .route("/:projectId/n/:noteId")
  .get(validateProjectPermission(AvailableUserRoles), getNoteById)
  .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateNote)
  .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNote); // get note by id

export default router;
