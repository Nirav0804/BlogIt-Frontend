import React, { useState } from "react";

function CreatePost() {
  const categories = [
    "Sports",
    "Technology",
    "Data Science",
    "Health & Wellness",
    "Education",
    "Finance",
    "Gaming",
    "Entertainment",
    "Travel",
    "Food",
    "Lifestyle",
    "Science",
    "Business",
    "History",
    "Politics",
    "Others",
  ];

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
    setFileName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("category", formData.category);
    if (formData.image) data.append("image", formData.image);

    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: data,
      });

      if (!response.ok) throw new Error("Failed to create post");
      const result = await response.json();
      console.log("Post created:", result);

      // Reset form
      setFormData({ title: "", content: "", category: "", image: null });
      setPreview(null);
      setFileName("");
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#332233] p-4">
      <div className="w-full max-w-2xl p-6 bg-[#5A3F5E] shadow-lg rounded-lg text-white">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">Create a New Blog Post</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-500 bg-[#77557C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B089B0]"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-500 bg-[#77557C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B089B0]"
              rows="5"
              required
            ></textarea>
          </div>

          {/* Category Dropdown (Now Fully Visible) */}
          <div>
            <label className="block text-sm font-medium text-gray-300">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-3 border border-gray-500 bg-[#77557C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B089B0]"
              required
            >
              <option value="" disabled className="text-gray-400">Select a category</option>
              {categories.map((category, index) => (
                <option
                  key={index}
                  value={category}
                  className="text-black bg-white hover:bg-gray-300"
                >
                  {category}
                </option>
              ))}
            </select>

          </div>

          {/* Image Upload with Preview & Remove Button */}
          <div className="relative flex flex-col items-center justify-center border border-gray-500 rounded-lg p-4 bg-[#77557C] w-full">
            {/* Image Preview Box */}
            <div className="w-full h-48 flex items-center justify-center border border-gray-400 rounded-lg overflow-hidden bg-[#5A3F5E]">
              {preview ? (
                <img src={preview} alt="Preview" className="max-w-full max-h-full object-contain" />
              ) : (
                <p className="text-gray-300 text-sm">No image selected</p>
              )}
            </div>

            {/* File Name Display */}
            {fileName && (
              <p className="mt-2 text-sm text-gray-300 text-center">{fileName}</p>
            )}

            {/* Image Upload / Remove */}
            {preview ? (
              <button
                type="button"
                onClick={handleRemoveImage}
                className="mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition"
              >
                Remove Image
              </button>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full mt-2 cursor-pointer p-2 text-center bg-[#B089B0] text-white rounded-lg"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-[#B089B0] hover:bg-[#A073A0] rounded-lg font-bold text-white transition duration-300"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
