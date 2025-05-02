import mongoose, { Schema } from "mongoose";
import { AvailableTaskStatuses, TaskStatusEnum } from "../utils/constants.js";
const taskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required:true,
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      // required:[true,"Project ref is required"]
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      // enum: ka data type array hai toh array constants me se AvailableTaskStatuses hi dega
      enum: AvailableTaskStatuses,
      // default : ka datatype string hai toh constants file me TaskStatusEnum hi dega string
      default: TaskStatusEnum.TODO,
    },
    attachments: {
      // type:[{},{},{},{}]
      type: [
        {
          url: String,
          mimetype: String,//mimeType:png jpeg jpg pdf
          size: Number,
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const Task = mongoose.model("Task", taskSchema);
