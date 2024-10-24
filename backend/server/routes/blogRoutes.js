const express = require("express");
const { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId } = require("../controller/BlogController");

const router = express.Router();

router.get("/", getAllBlogs); // Get all blogs
router.post("/add", addBlog); // Add a new blog
router.put("/update/:id", updateBlog); // Update a blog by ID
router.get("/:id", getById); // Get a blog by ID
router.delete("/:id", deleteBlog); // Delete a blog by ID
router.get("/user/:id", getByUserId); // Get all blogs by a specific user ID

module.exports = router;

