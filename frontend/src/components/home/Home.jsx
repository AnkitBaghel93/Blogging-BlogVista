import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();
  const capitalizeFirstLetter = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/blogs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error("Failed to delete blog", err);
    }
  };


  const handleEdit = (blog) => {
    localStorage.setItem("editBlog", JSON.stringify(blog));
    navigate("/blog");
  };

  const extractText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const truncateText = (text, limit = 30) => {
    const words = text.split(" ");
    return words.slice(0, limit).join(" ") + (words.length > limit ? "..." : "");
  };

  return (
    <div className="min-h-screen bg-[#C6E1F2] px-6 py-20 pt-32">
      {blogs.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-2xl shadow-xl max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">
            👋 Welcome to the Assignment of <span className="text-blue-500">Truly IAS</span>
          </h1>
          <p className="text-gray-600 text-lg">Start by creating your first blog!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-800">📰 Recent Blogs</h1>
          {blogs.map((blog, i) => {
            const plainText = extractText(blog.content);
            const isExpanded = expandedIndex === i;

            return (
              <div
                key={blog._id}
                className="mb-6 p-6 border border-blue-100 rounded-2xl shadow-sm bg-white hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2 text-blue-800">
                    {capitalizeFirstLetter(blog.title)}
                  </h2>

                  <p
                    className={`text-gray-700 mb-2 break-words ${
                      isExpanded ? "" : "overflow-hidden"
                    }`}
                    style={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: isExpanded ? "none" : 3,
                      overflow: isExpanded ? "visible" : "hidden",
                    }}
                  >
                    {isExpanded ? plainText : truncateText(plainText)}
                    {plainText.split(" ").length > 30 && (
                      <button
                        onClick={() => setExpandedIndex(isExpanded ? null : i)}
                        className="ml-2 text-blue-500 text-sm font-medium hover:underline"
                      >
                        {isExpanded ? "Read less" : "Read more"}
                      </button>
                    )}
                  </p>

                  <p className="text-sm text-gray-400">Slug: /{blog.slug}</p>
                </div>

                {/* Improved Buttons */}
                <div className="flex space-x-2 mt-1">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium rounded-full text-sm transition"
                    title="Edit Blog"
                  >
                    <FaEdit size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-full text-sm transition"
                    title="Delete Blog"
                  >
                    <FaTrash size={14} />
                    Delete
                  </button>
                </div>
              </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HomePage;
