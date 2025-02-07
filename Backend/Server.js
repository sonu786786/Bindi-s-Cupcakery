import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./Config/db.js";
import authRoutes from "./Routes/AuthRoutes.js";

const app = express();

// Load environment variables
dotenv.config();

// Connect to database
ConnectDb();



// Middleware for JSON parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use((req, res, next) => {
    console.log("📩 Incoming Request Body:", req.body);
    next();
});

//routes
app.use("/api/v1/auth",authRoutes)
app.get("/", (req, res) => {
    res.send({
        Message: "Welcome to Ecommerce"
    });
});




const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

