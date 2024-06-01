import jwt from "jsonwebtoken"


export const cookieSender = (user, res, statusCode, message) => {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    res.cookie("token", token, {
        httpOnly: true,
        maxAge: 2592000000,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true
    }).status(statusCode).json({
        success: true,
        message,
    })
}