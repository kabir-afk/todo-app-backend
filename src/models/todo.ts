import mongoose from "mongoose";

interface ITask {
  title: string;
  description: string;
  isCompleted: boolean;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TASK = mongoose.model<ITask>("task", taskSchema);

export default TASK;
