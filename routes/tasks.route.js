import express from "express"
import { isAuthenticated } from "../middlewares/auth.middlware.js"
import { getAllTask, createTask, deleteTask, updateStatus } from "../controllers/tasks.controller.js"

const router = express.Router()

// task all route
router.get("/alltask", isAuthenticated, getAllTask)

// task create route
router.post("/newtask", isAuthenticated, createTask)

// task status update route
router.post("/taskstatus/:id", isAuthenticated, updateStatus)

// task delete route
router.delete("/delete/:id", isAuthenticated, deleteTask)

export default router