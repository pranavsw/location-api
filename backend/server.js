const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database("locations.db", (err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      "CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY, latitude REAL, longitude REAL, timestamp TEXT)"
    );
  }
});

// POST endpoint to receive location data
app.post("/api/location", (req, res) => {
  const { latitude, longitude, timestamp } = req.body;

  if (!latitude || !longitude || !timestamp) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const query = "INSERT INTO locations (latitude, longitude, timestamp) VALUES (?, ?, ?)";
  db.run(query, [latitude, longitude, timestamp], function (err) {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    console.log(`New Location Added - Latitude: ${latitude}, Longitude: ${longitude}, Timestamp: ${timestamp}`);
    res.status(201).json({ message: "Location stored successfully", id: this.lastID });
  });
});

// GET endpoint to fetch all locations
app.get("/api/locations", (req, res) => {
  db.all("SELECT * FROM locations", [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(rows);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
