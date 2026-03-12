require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// Correct route imports
const authRoutes = require("./routes/authRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const goalRoutes = require("./routes/goalRoutes");

const app = express();

// ------------------- CORS -------------------
app.use(
  cors({
    origin: [
      'https://expensetracker-0301.onrender.com', // production frontend
      'http://localhost:5173', // local frontend
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ------------------- Body Parser -------------------
app.use(express.json());

// ------------------- Connect Database -------------------
connectDB();

// ------------------- Root Route -------------------
app.get("/", (req, res) => {
  res.send("Expense Tracker Backend is running!");
});

// ------------------- API Routes -------------------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/goal", goalRoutes); // consistent with other APIs

// ------------------- Static Uploads -------------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------- Start Server -------------------
const PORT = process.env.PORT || 8000; // backend port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));