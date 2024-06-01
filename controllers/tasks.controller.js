import ErrorHandler from "../middlewares/error.middleware.js";
import Task from "../models/tasks.model.js";

// get all
export const getAllTask = async (req, res, next) => {
    try {
        const allTask = await Task.find()

        res.status(201).json({
            success: true,
            message: "all task fetched successfully",
            allTask
        })
    } catch (error) {
        return next(new ErrorHandler("get all task internal server error", 500))

    }
}
// create
export const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body

        const findTask = await Task.findOne({ title: title })

        if (findTask) return next(new ErrorHandler("task with same title already exists", 400))

        const createTask = await Task.create({ title, description, createdBy: req.user })

        res.status(201).json({
            success: true,
            message: "task created successfully",
        })
    } catch (error) {
        return next(new ErrorHandler("create task internal server error with errorhandeler", 500))
    }
}

// update status
export const updateStatus = async (req, res, next) => {
    try {
        const { id } = req.params

        const task = await Task.findById(id)

        if (!task) return next(new ErrorHandler("invalid task id for update", 400))

        task.isCompleted = !task.isCompleted

        const taskStatus = await task.save()

        res.status(201).json({
            success: true,
            message: "task status updated successfully",
        })
    } catch (error) {
        return next(new ErrorHandler("task status update internal error", 500))
    }
}

// delete
export const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params

        const task = await Task.findById(id)

        if (!task) return next(new ErrorHandler("invalid task id for delete", 400))

        // const deletedTask = await Task.deleteOne()
        const deletedTask = await Task.findByIdAndDelete(id)

        if (!deletedTask) return next(new ErrorHandler("server error, task not deleted", 400))

        res.status(202).json({
            success: true,
            message: "task deleted successfully",
        })
    } catch (error) {
        return next(new ErrorHandler("delete task internal server error", 500))
    }
}