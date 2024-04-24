const express = require("express");
const router = express.Router();
const Tag = require("../models/tag");

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve tags" });
  }
});

// Create a new tag
router.post("/", async (req, res) => {
  try {
    const { name } = req.body;
    const newTag = await Tag.create({ name });
    res.status(201).json(newTag);
  } catch (error) {
    res.status(500).json({ error: "Failed to create tag" });
  }
});

// Update an existing tag
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let tagToUpdate = await Tag.findByPk(id);
    if (!tagToUpdate) {
      tagToUpdate = await Tag.create({ name }); // Create a new tag if ID doesn't exist
      return res.status(201).json(tagToUpdate);
    }
    tagToUpdate.name = name;
    await tagToUpdate.save();
    res.status(200).json(tagToUpdate);
  } catch (error) {
    res.status(500).json({ error: "Failed to update tag" });
  }
});

// Delete a tag
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const tagToDelete = await Tag.findByPk(id);
    if (!tagToDelete) {
      return res.status(404).json({ error: "Tag not found" });
    }
    await tagToDelete.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete tag" });
  }
});

module.exports = router;
