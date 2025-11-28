import { ErrorHandler } from "../middleware/error.js";
import TASK from "../models/todo.js";
import { type Response, type Request, type NextFunction } from "express";
async function newTask(req: Request, res: Response, next: NextFunction) {
  try {
    const { todo } = req.body;
    const task = await TASK.create({
      todo,
      user: req.user._id,
    });
    return res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    next(error);
  }
}

async function getUserTask(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.user._id;
    const task = await TASK.find({ user: userId });
    res.status(200).json({ success: true, task });
  } catch (error) {
    next(error);
  }
}
async function updateTask(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const task = await TASK.findById(id);
    if (!task) return next(new ErrorHandler(404, "Task not found"));
    task.isCompleted = !task.isCompleted;
    await task.save();
    return res.status(202).json({ message: "Updated successfully" });
  } catch (error) {
    next(error);
  }
}
async function deleteTask(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const task = await TASK.findByIdAndDelete(id);
    if (!task) return next(new ErrorHandler(404, "Task not found"));
    return res.status(202).json({ message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
}

export { newTask, getUserTask, updateTask, deleteTask };
