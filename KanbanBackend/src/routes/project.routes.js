import { Router } from "express";
import {
  addMemberToProject,
  createProject,
  deleteMember,
  deleteProject,
  getProjectById,
  getProjectMembers,
  getProjects,
  updateMemberRole,
  updateProject,
} from "../controllers/project.controllers.js";
import {verifyJWT}  from "../middlewares/verifyJwt.middleware.js";

const router = Router();

// Project Routes............................................................................
router.route("/projects").get(verifyJWT, getProjects); // Get all projects

router.route("/projects").post(verifyJWT, createProject); // Create a new project

router.route("/projects/:projectId").get(verifyJWT, getProjectById); // Get a specific project

router.route("/update/:projectId").put(verifyJWT, updateProject); // Update a specific project

router.route("/delete/:projectId").delete(verifyJWT, deleteProject); // Delete a specific project

// Member Management Routes...................................................................
router.route("/projects/:projectId/members").get(verifyJWT, getProjectMembers); // Get project members

router
  .route("/projects/:projectId/members")
  .post(verifyJWT, addMemberToProject); // Add a member to the project

router
  .route("/projects/:projectId/members/:memberId")
  .delete(verifyJWT, deleteMember); // Remove a member from the project

router
  .route("/projects/:projectId/members/:memberId/role")
  .put(verifyJWT, updateMemberRole); // Update a member's role

export default router;
