import jwt from 'jsonwebtoken'
import User from '../models/users.model.js'


export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) return res.status(400).json({
        success: false,
        message: "login first"
    })

    const decodeToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodeToken._id)

    if (!user) return res.status(400).json({
        success: false,
        message: "invalid token"
    })

    req.user = user
    next()
}