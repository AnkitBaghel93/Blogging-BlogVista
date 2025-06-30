const express = require("express");
const router = express.Router();
const { createBlog, getUserBlogs , updateBlog, deleteBlog} = require("../controllers/blogController");
const { authenticateUser } = require("../middleware/authMiddleware");

router.post("/blogs", authenticateUser, createBlog);      //create blog
router.get("/blogs", authenticateUser, getUserBlogs);     // retrive blog
router.put("/blogs/:id", authenticateUser, updateBlog);   // Update route
router.delete("/blogs/:id", authenticateUser, deleteBlog); // Delete route

module.exports = router;
