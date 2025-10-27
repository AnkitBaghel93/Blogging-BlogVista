import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaPenNib } from "react-icons/fa";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-6 py-20 pt-32 flex flex-col items-center justify-center">
      {blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-[80vh]">
          <FaPenNib size={60} className="text-blue-600 mb-6 animate-pulse" />
          <h1 className="text-6xl font-extrabold text-blue-700 mb-4 leading-tight">
            Share Your Voice with the World
          </h1>
          <p className="text-gray-700 text-xl max-w-2xl mb-10 leading-relaxed">
            Welcome to{" "}
            <span className="text-blue-500 font-semibold">BlogVista</span> — a
            creative platform to share your thoughts, experiences, and ideas that
            inspire others. Begin your blogging journey today and let your words
            make an impact.
          </p>
          <button
            onClick={() => navigate("/blog")}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-transform hover:scale-105"
          >
            ✍️ Create Your First Blog
          </button>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-extrabold text-gray-800">
              📰 Explore the Latest Blogs
            </h1>
            <p className="text-gray-500 italic text-sm">
              “Your thoughts deserve to be heard.”
            </p>
          </div>

          {blogs.map((blog, i) => {
            const plainText = extractText(blog.content);
            const isExpanded = expandedIndex === i;

            return (
              <div
                key={blog._id}
                className="mb-6 p-6 border border-blue-100 rounded-2xl shadow-md bg-white hover:shadow-xl transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 text-blue-800">
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
                          onClick={() =>
                            setExpandedIndex(isExpanded ? null : i)
                          }
                          className="ml-2 text-blue-500 text-sm font-medium hover:underline"
                        >
                          {isExpanded ? "Read less" : "Read more"}
                        </button>
                      )}
                    </p>

                    <p className="text-sm text-gray-400">Slug: /{blog.slug}</p>
                  </div>

                  {/* Action Buttons */}
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
