import React, { useState } from "react";

function CreatePost({ isOpen, onClose }) {
    if (!isOpen) return null;

    const categories = [
        "Sports", "Technology", "Data Science", "Health & Wellness",
        "Education", "Finance", "Gaming", "Entertainment", "Travel",
        "Food", "Lifestyle", "Science", "Business", "History",
        "Politics", "Others",
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

        // FormData for submission
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

            console.log("Post created:", await response.json());

            // Reset form
            setFormData({ title: "", content: "", category: "", image: null });
            setPreview(null);
            setFileName("");
            onClose(); // Close modal after successful submission
        } catch (error) {
            console.error("Error creating post:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex justify-center items-center z-50">
            {/* Modal Box */}
            <div className="bg-[#77557C] p-8 rounded-2xl shadow-xl w-full max-w-xl relative text-white border border-[#DFC2F2]">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl">
                    &times;
                </button>

                <h2 className="text-3xl font-bold text-center mb-6">Create a New Post</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter post title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Content</label>
                        <textarea
                            name="content"
                            placeholder="Write your content..."
                            value={formData.content}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg focus:outline-none"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg focus:outline-none"
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map((category, index) => (
                                <option key={index} value={category} className="text-black">
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="border border-[#DFC2F2] rounded-lg p-4 bg-[#E8D5E5] text-center">
                        {preview ? (
                            <div className="relative">
                                <img src={preview} alt="Preview" className="max-w-full h-40 mx-auto rounded-lg" />
                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 rounded-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 cursor-pointer" />
                                <p className="text-[#4A2C4A] text-sm mt-2">{fileName || "No image selected"}</p>
                            </>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-[#DFC2F2] text-[#4A2C4A] font-semibold rounded-xl hover:bg-[#EAD6FF] transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Post"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
