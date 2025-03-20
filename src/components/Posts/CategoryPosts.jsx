import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import CategoryNavbar from "../Navigation/CategoryNavBar";
import PostCard from "./PostCrad";
import Loader from "./Loader";

function CategoryPosts() {
    const categories = {
        1: "Sports",
        2: "Technology",
        3: "Data Science",
        4: "Health & Wellness",
        5: "Education",
        6: "Finance",
        7: "Gaming",
        8: "Entertainment",
        9: "Travel",
        10: "Food",
        11: "Lifestyle",
        12: "Science",
        13: "Business",
        14: "History",
        15: "Politics",
        16: "Others",
    };

    const { id } = useParams();
    const categoryName = categories[id] || "Unknown Category";
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/category/${id}/posts`);
                setPosts(response.data);
            } catch (err) {
                setError("Failed to fetch posts");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);

    return (
        <div className="flex flex-col items-center min-h-screen">
            <CategoryNavbar />
            <div className="w-full flex justify-center mt-6">
                <Categories />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-800">
                Posts in {categoryName}
            </h2>

            {loading ? (
                <Loader /> // Show the loader while fetching posts
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                <p>No posts found for this category.</p>
            )}
        </div>
    );
}

export default CategoryPosts;
