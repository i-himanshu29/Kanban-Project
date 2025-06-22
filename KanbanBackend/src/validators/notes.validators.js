import {body} from "express-validator"

const noteValidator = () => {
    return [
        body("project")
            .trim()
            .notEmpty()
            .withMessage("project is required")
            .isLength({ min: 3 })
            .withMessage("user should be atleast 3 char")
            .isLength({ max: 20 })
            .withMessage("user cannot exceed 20 char"),
        body("content")
            .trim()
            .notEmpty()
            .withMessage("content is required"),
    ]
}
// to be updated...
const updateNoteValidator = () => {
    return [
        body("project")
            .trim()
            .notEmpty()
            .withMessage("Project is required")
            .isLength({ min: 3 })
            .withMessage("user should be atleast 3 char")
            .isLength({ max: 20 })
            .withMessage("user cannot exceed 20 char"),
        body("content")
            .trim()
            .notEmpty()
            .withMessage("content is required")
    ]
}

export {noteValidator,updateNoteValidator}