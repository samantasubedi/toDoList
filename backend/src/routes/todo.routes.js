import express from "express";
import { getTodo } from "../controllers/todo.controller.js";
import { postTodo } from "../controllers/todo.controller.js";
const router = express.Router();
router.get("/", getTodo);
router.post("/", postTodo);
export default router;
