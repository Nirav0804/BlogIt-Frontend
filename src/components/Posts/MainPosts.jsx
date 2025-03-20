import React, { useState, useEffect } from "react";
import FeaturedPosts from "./FeaturedPosts";
import Categories from "./Categories";
import TrendingPosts from "../Posts/TrendingPosts";
import MainNavbar from "../Navigation/MainNavbar";
import CreatePost from "../Posts/CreatePost";
import Posts from "./Posts";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MainPosts() {
    const [isPostOpen, setIsPostOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("");
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [trendingPosts, setTrendingPosts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            navigate("/");
        }
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:8080/api/v1/posts");
            const fetchedPosts = response.data.posts;
            setPosts(fetchedPosts);
            console.log("Fetched posts:", response.data.posts);
            const sortedTrendingPosts = [...fetchedPosts]
                .sort((a, b) => (b.likeCount + b.commentCount) - (a.likeCount + a.commentCount))
                .slice(0, 5);
            setTrendingPosts(sortedTrendingPosts);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        if (isPostOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isPostOpen]);

    return (
        <div className="flex flex-col min-h-screen">
            <MainNavbar allposts={fetchPosts} setSearchQuery={setSearchQuery} />

            {isPostOpen && <CreatePost isOpen={isPostOpen} onClose={() => setIsPostOpen(false)} />}

            <div className={`flex flex-row gap-6 px-6 py-4 flex-1 ${isPostOpen ? "overflow-hidden" : ""}`}>
                <div className="w-3/4">
                    <Posts posts={posts} searchQuery={searchQuery} loading={loading} error={error} />
                </div>

                <aside className="w-1/4 bg-gray-100 p-6 rounded-xl sticky top-6 h-[calc(100vh-24px)] overflow-y-auto">
                    <Categories />
                    <TrendingPosts posts={trendingPosts} />
                </aside>
            </div>
        </div>
    );
}

export default MainPosts;
