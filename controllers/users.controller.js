import User from "../models/users.model.js";
import bcrypt from "bcrypt"
import { cookieSender } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.middleware.js";


// register
export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const findUser = await User.findOne({ email })

        if (findUser) return next(new ErrorHandler("user already exists", 400))

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await User.create({ name, email, password: hashedPassword })

        cookieSender(createdUser, res, 201, "register successful")

    } catch (error) {
        return next(new ErrorHandler("register internal server error", 500))
    }
}

// login
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password")

        if (!user) return next(new ErrorHandler("email doesn't exists", 400))

        const matchPassword = await bcrypt.compare(password, user.password)

        if (!matchPassword) return next(new ErrorHandler("Invalid password", 400))

        cookieSender(user, res, 202, `welcome back ${user.name}`)

    } catch (error) {
        next(error)
    }
}

// get profile
export const getMyProfile = async (req, res, next) => {
    try {
        const userData = req.user

        res.status(200).json({
            success: true,
            message: "profile data fetch successfully",
        })
    } catch (error) {
        next(error)
    }
}

// update
export const updateUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const { _id } = req.user

        const updateUser = await User.findByIdAndUpdate(_id, { name, email, password: hashedPassword }, { new: true, findByIdAndModify: true })

        res.status(202).json({
            success: true,
            message: "user updated successfully",
            updateUser
        })

    } catch (error) {
        return next(new ErrorHandler("update user internal server error", 500))
    }

}

// logout
export const logoutUser = (req, res, next) => {

    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        }).status(200).json({
            success: true,
            message: "logout successfull"
        })
    } catch (error) {
        return next(new ErrorHandler("logout internal server error", 500))
    }
}

// delete
export const deleteUser = async (req, res, next) => {
    try {
        const { _id } = req.user

        const deletedUser = await User.findByIdAndDelete(_id)
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true
        }).status(202).json({
            success: true,
            message: "user deleted successfully",
            deletedUser
        })

    } catch (error) {
        return next(new ErrorHandler("delete internal server error", 500))
    }

}