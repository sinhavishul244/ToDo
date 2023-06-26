import express from "express";
import { isAuthenticated } from "../Utils/features.js";
import { createNewTask, deleteTask, listAllTask, updateTask } from "../Controllers/task.js";

const router = express.Router();

router.post("/new", isAuthenticated, createNewTask);
router.get("/all", isAuthenticated, listAllTask);
router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);


export default router;