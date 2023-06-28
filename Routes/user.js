import express from "express";
import { createUser, findMyDetails, isLogin, loginUser, logoutUser } from "../Controllers/user.js";
import { isAuthenticated } from "../Utils/features.js";
const router = express.Router();


// get requests
router.get("/logout", isAuthenticated, logoutUser);
router.get("/islogin", isLogin);
router.get("/findme", isAuthenticated, findMyDetails);
// post requests
router.post("/new", createUser);
router.post("/login", loginUser);


export default router;