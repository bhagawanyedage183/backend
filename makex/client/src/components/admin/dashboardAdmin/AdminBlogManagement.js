import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBlogManagement = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    isFeatured: false,
    image: ""
  });

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/blog/posts");
      setPosts(res.data.posts);
    } catch (error) {
      console.error("Failed to fetch posts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleEdit = (post) => {
    setEditingPost(post._id);
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      category: post.category,
      isFeatured: post.isFeatured,
      image: post.image
    });
  };

  const handleCancel = () => {
    setEditingPost(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      category: "",
      isFeatured: false,
      image: ""
    });
  };

  const handleSave = async () => {
    try {
      if (editingPost) {
        // Update existing post
        await axios.put("/api/blog/posts/" + editingPost, formData);
      } else {
        // Create new post
        await axios.post("/api/blog/posts", formData);
      }
      fetchPosts();
      handleCancel();
    } catch (error) {
      console.error("Failed to save post", error);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete("/api/blog/posts/" + postId);
      fetchPosts();
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Blog Management</h2>
      <button
        onClick={() => setEditingPost(null)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Add New Post
      </button>
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Title</th>
              <th className="border border-gray-300 p-2">Category</th>
              <th className="border border-gray-300 p-2">Featured</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td className="border border-gray-300 p-2">{post.title}</td>
                <td className="border border-gray-300 p-2">{post.category}</td>
                <td className="border border-gray-300 p-2">
                  {post.isFeatured ? "Yes" : "No"}
                </td>
                <td className="border border-gray-300 p-2 space-x-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {(editingPost !== null || editingPost === null) && (
              <tr>
                <td className="border border-gray-300 p-2" colSpan="4">
                  <div className="space-y-2">
                    <input
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      name="category"
                      placeholder="Category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <textarea
                      name="excerpt"
                      placeholder="Excerpt"
                      value={formData.excerpt}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <textarea
                      name="content"
                      placeholder="Content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      rows={6}
                    />
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="isFeatured"
                          checked={formData.isFeatured}
                          onChange={handleInputChange}
                          className="form-checkbox"
                        />
                        <span className="ml-2">Featured</span>
                      </label>
                    </div>
                    <input
                      type="text"
                      name="image"
                      placeholder="Image filename"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <div className="space-x-2">
                      <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminBlogManagement;