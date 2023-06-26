import ErrorHandler from "../Middlewares/errorHandler.js";
import { Task } from "../Models/task.js"

export const createNewTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title,
            description,
            user: req.user._id
        })
        res.status(201).json({
            success: true,
            message: "task created succsssfully"
        })
    } catch (error) {
        next(error);
    }
}

export const listAllTask = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user._id });
        res.status(200).json({
            success: true,
            tasks
        })
    } catch (error) {
        next(error);
    }
}

export const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id });

        if (!task) return next(new ErrorHandler("task doesn't exist"), 404);

        if (String(task.user) === String(req.user._id)) //using string fuction to compare because normal comparison would compare the reference of objects which won't match!
        {
            task.isCompleted = !task.isCompleted;
            await task.save();

            res.status(200).json({
                success: true,
                message: "task updated successfully"
            })
        }
        else {
            return next(new ErrorHandler("task does not belong to user", 401));
        }
    }
    catch (e) {
        next(e);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await Task.findOne({ _id: id });

        if (!task) return next(new ErrorHandler("task doesn't exist"), 404);

        if (String(task.user) === String(req.user._id)) {

            await task.deleteOne();

            res.status(200).json({
                success: true,
                message: "task deleted successfully"
            })
        }
        else {
            return next(new ErrorHandler("task does not belong to user", 401));
        }
    }
    catch (e) {
        next(e);
    }
}