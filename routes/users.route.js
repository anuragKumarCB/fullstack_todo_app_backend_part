import express from "express"
import { registerUser, loginUser, logoutUser, updateUser, deleteUser, getMyProfile } from "../controllers/users.controller.js";
import { isAuthenticated } from "../middlewares/auth.middlware.js";

const router = express.Router();

// user register route
router.post("/register", registerUser)

// user login route
router.post("/login", loginUser)

// user get profile route
router.get("/myprofile", isAuthenticated, getMyProfile)

// user update route
router.put("/update", isAuthenticated, updateUser)

// user logout route
router.get("/logout", isAuthenticated, logoutUser)

// user delete route
router.delete("/delete", isAuthenticated, deleteUser)

export default router