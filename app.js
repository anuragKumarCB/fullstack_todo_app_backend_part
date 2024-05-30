import express from "express"
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import cors from "cors"
import userRouter from "./routes/users.route.js";
import taskRouter from "./routes/tasks.route.js"
import { errorMiddleware } from "./middlewares/error.middleware.js";

config({
    path: "./.env"
})

export const app = express();

// middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

// using routes
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tasks", taskRouter)

// using error middleware
app.use(errorMiddleware)


app.get("/", (req, res) => {
    res.send(`server is running on ${process.env.PORT} in ${process.env.NODE_ENV}`)
})
