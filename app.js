import express from "express";
import { config } from "dotenv";
import path from "path";
import { errorHandler } from "./Middlewares/errorHandler.js";
import userRoute from "./Routes/user.js"
import taskRoute from "./Routes/task.js"
import cookieParser from "cookie-parser";
import cors from "cors";

//configuring config file
config({
    path: "./Data/config.env"
})

export const app = express();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(path.resolve(), "/public")));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));


//routes
app.get("/", (req, res) => {
    res.status(200).render("home");
})

app.use("/users", userRoute);
app.use("/tasks", taskRoute);




//error handler
app.use(errorHandler);