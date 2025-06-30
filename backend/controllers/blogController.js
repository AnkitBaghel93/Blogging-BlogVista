const Blog = require("../models/blog");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, slug } = req.body;
    const userId = req.user.userId;

    const newBlog = new Blog({ title, content, slug, userId });
    await newBlog.save();

    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Blogs for Logged-in User
exports.getUserBlogs = async (req, res) => {
  try {
    const userId = req.user.userId;
    const blogs = await Blog.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};




// Update blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, content, slug } = req.body;
    const blogId = req.params.id;
    const userId = req.user.userId;

    const blog = await Blog.findOne({ _id: blogId, userId });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found or unauthorized" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.slug = slug || blog.slug;

    await blog.save();
    res.status(200).json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Delete blog
exports.deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const userId = req.user.userId;

    const blog = await Blog.findOneAndDelete({ _id: blogId, userId });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found or unauthorized" });
    }

    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
