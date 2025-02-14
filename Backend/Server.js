import express from "express";
import dotenv from "dotenv";
import ConnectDb from "./Config/db.js";
import cors from "cors"
import authRoutes from "./Routes/AuthRoutes.js";
import payment from "./Routes/paymentRoutes.js"
import categoryRoutes from "./Routes/CategoryRoutes.js"
import productRoutes from "./Routes/ProductRoutes.js"
import morgan from "morgan";

const app = express();

// Load environment variables
dotenv.config();

// Connect to database
ConnectDb();

// Use Morgan middleware to log HTTP requests
app.use(morgan("dev"));


// Middleware for JSON parsing
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use((req, res, next) => {
    console.log("📩 Incoming Request Body:", req.body);
    next();
});

app.use(cors())
// app.use(
//     cors({
//       origin: "http://localhost:3000", // Allow frontend URL
//       methods: "GET,POST,PUT,DELETE,PATCH,OPTIONS",
//       allowedHeaders: "Content-Type,Authorization, Access-Control-Allow-Origin",
//       credentials: true, // Allow cookies and auth headers
//     })
//   );

//routes
app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)
// Use the payment routes
app.use('/api/v1/payment', payment);
app.get("/", (req, res) => {
    res.send({
        Message: "Welcome to Ecommerce"
    });
});


const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

