const express = require("express");
const router = express.Router();
const Product = require("../models/product");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newProduct = await Product.create({ name });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// Update an existing product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let productToUpdate = await Product.findByPk(id);
    if (!productToUpdate) {
      productToUpdate = await Product.create({ name }); // Create a new product if ID doesn't exist
      return res.status(201).json(productToUpdate);
    }
    productToUpdate.name = name;
    await productToUpdate.save();
    res.status(200).json(productToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productToDelete = await Product.findByPk(id);
    if (!productToDelete) {
      return res.status(404).json({ error: "Product not found" });
    }
    await productToDelete.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
