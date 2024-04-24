const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve categories" });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    const { categoryName } = req.body;
    const newCategory = await Category.create({ categoryName });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Failed to create category" });
  }
});

// Update an existing category
router.put("/api/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { updatedCategoryName } = req.body;
    let categoryToUpdate = await Category.findByPk(id);
    if (!categoryToUpdate) {
      categoryToUpdate = await Category.create({ updatedCategoryName }); // Create a new category if ID doesn't exist
      return res.status(201).json(categoryToUpdate);
    }
    categoryToUpdate.name = name;
    await categoryToUpdate.save();
    res.status(200).json(categoryToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Failed to update category" });
  }
});

// Delete a category
router.delete("/api/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const categoryToDelete = await Category.findByPk(id);
    if (!categoryToDelete) {
      return res.status(404).json({ error: "Category not found" });
    }
    await categoryToDelete.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete category" });
  }
});

module.exports = router;
