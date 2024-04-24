const express = require("express");
const sequelize = require("./db"); // Import Sequelize instance
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000; // You can set your desired port here

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes for categories, products, and tags
const categoryRoutes = require("./api/category");
const productRoutes = require("./api/product");
const tagRoutes = require("./api/tag");

// Use the routes
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/tag", tagRoutes);

// Sync Sequelize models with the database
async function syncDatabase() {
  try {
    await sequelize.sync(); // Sync all defined models to the database
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

syncDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
