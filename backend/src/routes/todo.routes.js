import express from "express";
import getTodo from "../controllers/todo.controller.js";
const router = express.Router();
router.get("/", getTodo);

export default router;
