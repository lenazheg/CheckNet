import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

export const dbClient = new Client({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.DB_HOST || "db",
  database: process.env.POSTGRES_DB || "checknet_db",
  password: process.env.POSTGRES_PASSWORD || "postgres",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

dbClient
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err));
