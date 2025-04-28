import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbClient } from "./db/dbClient.js";
import candidateRoutes from "./routes/candidateRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

dbClient
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err));

app.use("/api", candidateRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
