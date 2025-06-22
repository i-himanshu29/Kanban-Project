import { body } from "express-validator";

const taskValidator = () => {
  return [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("title is required")
        .isLength({ min: 3 })
        .withMessage("user should be atleast 3 char")
        .isLength({ max: 25 })
        .withMessage("user cannot exceed 25 char"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("description is required")
        .isLength({ min: 10 })
        .withMessage("user should be atleast 3 char")
        .isLength({ max: 70 })
        .withMessage("user cannot exceed 70 char"),
    body("project")
        .trim()
        .notEmpty()
        .withMessage("project is required")
        .isLength({ min: 3 })
        .withMessage("user should be atleast 3 char")
        .isLength({ max: 25 })
        .withMessage("user cannot exceed 25 char"),
  ];
};

// to be updated...
const updateTaskValidator = () => {
    return [
        body("title")
            .trim()
            .notEmpty()
            .withMessage("title is required")
            .isLength({ min: 3 })
            .withMessage("user should be atleast 3 char")
            .isLength({ max: 25 })
            .withMessage("user cannot exceed 25 char"),
        body("description")
            .trim()
            .notEmpty()
            .withMessage("description is required")
            .isLength({ min: 10 })
            .withMessage("user should be atleast 3 char")
            .isLength({ max: 70 })
            .withMessage("user cannot exceed 70 char"),
        body("project")
            .trim()
            .notEmpty()
            .withMessage("project is required")
            .isLength({ min: 3 })
            .withMessage("user should be atleast 3 char")
            .isLength({ max: 25 })
            .withMessage("user cannot exceed 25 char"),
      ];
};

const subTaskValidator = () => {
    return [
        body("title")
            .trim()
            .notEmpty()
            .withMessage("title is required")
            .isLength({ min: 3 })
            .withMessage("user should be atleast 3 char")
            .isLength({ max: 25 })
            .withMessage("user cannot exceed 25 char"),
        body("task")
            .trim()
            .notEmpty()
            .withMessage("task is required"),
        body("isCompleted")
            .isBoolean(true)
    ]
}

export { taskValidator ,updateTaskValidator , subTaskValidator};
