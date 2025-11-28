import mongoose from "mongoose";

interface ITask {
  todo: string;
  isCompleted: boolean;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
}
const taskSchema = new mongoose.Schema({
  todo: {
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
