import jwt from "jsonwebtoken";
import ErrorHandler from "../Middlewares/errorHandler.js";
import { User } from "../Models/user.js";

export const createToken = (id) => {
    return jwt.sign({ _id: id }, process.env.JWT_SECRET);
}

export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return next(new ErrorHandler("please login first"), 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id).select("+password");

    next();

}