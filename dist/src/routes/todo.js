import express from "express";
import { newTask, getUserTask, deleteTask, updateTask, editTask, } from "../controllers/todo.js";
const router = express.Router();
router.post("/new", newTask);
router.get("/my", getUserTask);
router.route("/:id").patch(editTask).delete(deleteTask);
router.route("/:id/toggle").patch(updateTask);
export default router;
//# sourceMappingURL=todo.js.map