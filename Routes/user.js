import express from "express";
import { createUser, isLogin, loginUser, logoutUser } from "../Controllers/user.js";
import { isAuthenticated } from "../Utils/features.js";
const router = express.Router();


router.post("/new", createUser);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logoutUser);
router.get("/islogin", isLogin);


export default router;