import express from "express";
import { config } from "dotenv";
import cors from "cors";
import paymentRoute from "./routes/paymentRoutes.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/database.js";

// Load environment variables
config({ path: "./config/config.env" });

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Routes
app.use("/api", paymentRoute);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

// Error Handling for Unhandled Promise Rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally, you can shut down the server or take other actions
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
