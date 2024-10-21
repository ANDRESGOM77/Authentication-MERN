import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./connection/connection.js";
import authRoutes from "./auth/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use("/api/auth", authRoutes);

app.listen(3000, () => {
  connectDB();
  console.log("Server listening in PORT :", PORT);
});
