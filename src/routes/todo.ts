import express from "express";
import {
  newTask,
  getUserTask,
  deleteTask,
  updateTask,
} from "../controllers/todo.js";

const router = express.Router();

router.post("/new", newTask);
router.get("/my", getUserTask);
router.route("/:id").put(updateTask).delete(deleteTask);

export default router;
