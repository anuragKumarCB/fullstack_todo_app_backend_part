import { connectDB } from "./DB/dbconfig.js";
import { app } from "./app.js";

const PORT = process.env.PORT || 8000

// starting server
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.BACKEND_URL}:${PORT}`);
})

// connecting to database
connectDB()