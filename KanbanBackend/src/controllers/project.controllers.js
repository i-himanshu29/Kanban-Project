import { Project } from "../models/project.model";

const getProjects = async (req, res) => {
  // get all projects

  // 1.search project created by user in db
  // 2.project not found - return res u don't have project
  // 3. If found return response
  // catch the error

  try {
    const project = await findMany({ project });
  } catch (error) {}
};

const getProjectById = async (req, res) => {
  // get project by id
  // if not return res
  // if found return response
  
};


// create Project...........................................................
const createProject = async (req, res) => {
  const { title, description, createdBy } = req.body;

  // Validate required fields
  if (!title || !description || !createdBy) {
    return res
      .status(400)
      .json({ status: false, message: "All fields are required" });
  }

  try {
    // Check if a project with the same title or description exists
    const existingProject = await Project.findOne({
      $or: [{ title }, { description }],
    });

    if (existingProject) {
      return res
        .status(409)
        .json({ status: false, message: "Project already exists" });
    }

    // Create and save the project
    const project = await Project.create({
      title,
      description,
      createdBy,
    });

    return res
      .status(201)
      .json({
        status: true,
        message: "Project created successfully",
        data: project,
      });
  } catch (error) {
    console.error("Error creating project:", error.message); // Useful for debugging
    return res.status(500).json({
      status: false,
      message: "An error occurred while creating the project",
    });
  }
};

const updateProject = async (req, res) => {
  // update project
  // search project id
  // if not found return res
  // if found then update the project
  // and save into db return response
};

const deleteProject = async (req, res) => {
  // delete project
  // serach project by id
  // remove entry from db
  //  and update the db return response
};

const getProjectMembers = async (req, res) => {
  // get project members
  // search project by id
  // count project member
  // return response
};

const addMemberToProject = async (req, res) => {
  // add member to project
  // search project
  // add new count
  // update into db
  // return response
};

const deleteMember = async (req, res) => {
  // delete member from project
  // search project
  // remove particular member through id
  // update db
  // return response
};

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
