import mongoose from "mongoose";
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
const TASK = mongoose.model("task", taskSchema);
export default TASK;
//# sourceMappingURL=todo.js.map