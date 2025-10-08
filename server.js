// server.js - Express server for Week 2 assignment

// Import required modules
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

// Import custom middleware
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas
connectDB();

// Middleware setup
app.use(express.json()); // replaces bodyParser.json()
app.use(logger);         // request logging middleware
app.use(auth);           // authentication middleware

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Product API! Go to /api/products to see all products.");
});

// Product routes
app.use("/api/products", productRoutes);

// Global error handler (must be last)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
