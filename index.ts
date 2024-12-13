import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db";
import brandRoutes from "./routes/brandRoutes";
import { errorHandler } from "./error-handler/applicationError";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Use the brand routes
app.use("/api/brands", brandRoutes);

// Default 404 route
app.use((req,res)=>{
  res.status(404).json({success:false,message:"Route not found"});
});

// Application-level error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
