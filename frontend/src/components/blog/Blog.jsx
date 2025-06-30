import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [blogId, setBlogId] = useState(null);
  const navigate = useNavigate();

  const generateSlug = (text) =>
    text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editBlog"));
    if (editData) {
      setTitle(editData.title);
      setContent(editData.content);
      setSlug(editData.slug);
      setBlogId(editData._id);
      localStorage.removeItem("editBlog");
    }
  }, []);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const blogData = { title, content, slug };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let response;
      if (blogId) {
        response = await axios.put(
          `http://localhost:5000/api/blogs/${blogId}`,
          blogData,
          config
        );
      } else {
        response = await axios.post(
          "http://localhost:5000/api/blogs",
          blogData,
          config
        );
      }

      if (response.status === 200 || response.status === 201) {
        navigate("/");
      }
    } catch (err) {
      console.error("Error saving blog:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbeafe] via-white to-[#f0f4ff] py-20 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200 mt-20">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
          {blogId ? "✏️ Edit Blog" : "✍️ Create a New Blog"}
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                const t = e.target.value;
                setTitle(t);
                setSlug(generateSlug(t));
              }}
              placeholder="Your blog title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Content</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              className="bg-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Slug</label>
            <input
              type="text"
              value={slug}
              readOnly
              className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
            />
          </div>

          <div className="text-right">
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition"
            >
              💾 {blogId ? "Update Blog" : "Save Blog"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
