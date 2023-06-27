import ErrorHandler from "../Middlewares/errorHandler.js";
import bcrypt from "bcrypt";
import { User } from "../Models/user.js";
import { createToken } from "../Utils/features.js";


export const createUser = async (req, res, next) => {
    try {
        const { name, email, password, password2 } = req.body;
        if (password === password2) {
            const hashedpassword = await bcrypt.hash(password, 10);

            await User.create({
                name, email, password: hashedpassword
            })

            res.status(200).json({
                success: true,
                message: "account created successfully"
            })
        }
        else {
            return next(new ErrorHandler("passwords must match", 401));
        }
    } catch (e) {
        if (e.code === 11000) {
            return next(new ErrorHandler("User already exits", 401))
        }
        next(e);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;


        //finding user
        const user = await User.findOne({ email });
        if (!user) return next(new ErrorHandler("Invalid username or password", 401));

        //password check
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid username or password", 401));


        res.cookie("token", createToken(user._id), {
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: user.name + " : login successful"
        })

    } catch (error) {
        next(error)
    }
}

export const logoutUser = (req, res, next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        }).json({
            success: true,
            message: "logout successful"
        })
    } catch (error) {
        next(error)
    }
}

export const isLogin = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) return next(new ErrorHandler("not logged in", 401))

        res.status(200).json({
            success: true
        })
    } catch (error) {
        next(error);
    }
}