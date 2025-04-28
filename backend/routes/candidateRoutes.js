import express from "express";
import dotenv from "dotenv";
import { dbClient } from "../db/dbClient.js";
import { fetchWikipediaSummary } from "../services/wikipedia.js";
import { generateSummary } from "../services/generateSummary.js";

dotenv.config();

const router = express.Router();

// POST endpoint to process candidate
router.post("/processCandidate", async (req, res) => {
  console.log("Received request to process candidate:", req.body);
  const { name, email, keywords } = req.body;

  if (!name || !email || !keywords) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const wikipediaSummary = await fetchWikipediaSummary(name);

  try {
    const candidateProfileSummary = await generateSummary(
      name,
      email,
      keywords,
      wikipediaSummary
    );

    const insertQuery = `
        INSERT INTO candidates (name, email, keywords, external_data, summary, created_at)
        VALUES ($1, $2, $3, $4, $5, NOW())
      `;
    const values = [
      name,
      email,
      keywords,
      wikipediaSummary,
      candidateProfileSummary,
    ];

    await dbClient.query(insertQuery, values);

    return res.status(201).send({ message: "Candidate saved successfully" });
  } catch (error) {
    console.error(
      "Error processing candidate:",
      error.response?.data || error.message
    );
    return res.status(500).send({ error: "Internal server error" });
  }
});

// GET endpoint to fetch all candidates
router.get("/candidates", async (req, res) => {
  const { search, sort } = req.query;

  try {
    let query = "SELECT * FROM candidates";
    const queryValues = [];
    const whereConditions = [];

    if (search) {
      queryValues.push(`%${search}%`);
      whereConditions.push(
        `(name ILIKE $${queryValues.length} OR keywords ILIKE $${queryValues.length})`
      );
    }

    if (whereConditions.length > 0) {
      query += " WHERE " + whereConditions.join(" AND ");
    }

    const orderDirection = sort === "asc" ? "ASC" : "DESC";
    query += ` ORDER BY created_at ${orderDirection}`;

    const result = await dbClient.query(query, queryValues);

    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching candidates:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// PUT endpoint to update a candidate - BONUS TASK
router.put("/candidate/:id/refresh", async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await dbClient.query(
      "SELECT * FROM candidates WHERE id = $1",
      [id]
    );
    const candidate = rows[0];

    if (!candidate) {
      return res.status(404).send({ error: "Candidate not found" });
    }

    const { name, email, keywords } = candidate;
    const wikipediaSummary = await fetchWikipediaSummary(name);

    const newSummary = await generateSummary(
      name,
      email,
      keywords,
      wikipediaSummary
    );

    const updateQuery = `
        UPDATE candidates
        SET external_data = $1, summary = $2
        WHERE id = $3
      `;
    await dbClient.query(updateQuery, [wikipediaSummary, newSummary, id]);

    res.status(200).send({ message: "Candidate refreshed successfully" });
  } catch (error) {
    console.error("Error refreshing candidate:", error.message);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default router;
