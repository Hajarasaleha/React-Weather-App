const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const SECRET_KEY = "hajara_saleha";
const PORT = 3001;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" }));
// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "#hajara23",
  database: "weather_app",
});

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Routes
app.options("*", cors()); 

// Signup
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  const hash = await bcrypt.hash(password, 10);
  const query = "INSERT INTO Users (username, email, password_hash) VALUES (?, ?, ?)";
  db.query(query, [username, email, hash], (err, result) => {
    if (err) return res.status(500).send("Error signing up");
    res.status(200).send("User registered successfully!");
  });
});





 app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM Users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).send("Internal Server Error");
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    try {
      const isValid = await bcrypt.compare(password, results[0].password_hash);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: results[0].id }, SECRET_KEY, { expiresIn: "1h" });
      return res.status(200).json({
        message: "Login successful",
        token, // Include the token in the response
      });
    } catch (compareErr) {
      console.error("Error during password validation:", compareErr);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
});


// Log Weather Search
app.post("/weather", (req, res) => {
  const { token, city, temperature, humidity, weather_description } = req.body;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const query = "INSERT INTO Searches (user_id, city, temperature, humidity, weather_description) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [decoded.userId, city, temperature, humidity, weather_description], (err) => {
      if (err) return res.status(500).send("Error logging search");
      res.status(200).send("Search logged successfully");
    });
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
});

app.get("/report", (req, res) => {
  const { token } = req.headers;
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log("Decoded Token:", decoded);

    const query = `
      SELECT u.username, s.city, s.temperature, s.humidity, s.weather_description, s.timestamp
      FROM Searches s
      JOIN Users u ON s.user_id = u.id
    `;
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching report:", err);
        return res.status(500).send("Error fetching report");
      }
      console.log("Fetched Report:", results);
      res.status(200).json(results);
    });
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).send("Unauthorized");
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
