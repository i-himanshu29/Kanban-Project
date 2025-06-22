import {body} from "express-validator"

const projectValidator = () => {
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("project name is required"),
        body("description")
            .trim()
            .notEmpty()
            .withMessage("description is required")
    ]
}
//to be updated...
const updateProjectValidator = () =>{
    return [
        body("name")
            .trim()
            .notEmpty()
            .withMessage("project name is required"),
        body("description")
            .trim()
            .notEmpty()
            .withMessage("description is required")
    ]
}


const projectMemberValidator = () => {
    return [
        body("user")
            .trim()
            .notEmpty()
            .withMessage("User is required")
            .isLength({ min: 3 })
            .withMessage("user should be atleast 3 char")
            .isLength({ max: 15 })
            .withMessage("user cannot exceed 15 char"),
        body("project")
            .trim()
            .notEmpty()
            .withMessage("project is required")
            .isLength({ min: 3 })
            .withMessage("user should be atleast 3 char")
            .isLength({ max: 20 })
            .withMessage("user cannot exceed 20 char"),
        body("role")
            .trim()
            .notEmpty()
            .withMessage("role is required")
    ]
}
export {projectValidator, updateProjectValidator , projectMemberValidator}
