import React, { useState, useEffect } from "react";
import FeaturedPosts from "./FeaturedPosts";
import Categories from "./Categories";
import TrendingPosts from "../Posts/TrendingPosts";
import MainNavbar from "../Navigation/MainNavbar";
import CreatePost from "../Posts/CreatePost";
import Posts from "./Posts";
import { useNavigate } from "react-router-dom";
function MainPosts() {
    const [isPostOpen, setIsPostOpen] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            navigate("/");
        }
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
            <MainNavbar />

            {isPostOpen && <CreatePost isOpen={isPostOpen} onClose={() => setIsPostOpen(false)} />}

            <div className={`flex flex-row gap-6 px-6 py-4 flex-1 ${isPostOpen ? "overflow-hidden" : ""}`}>
                <div className="w-3/4">
                    {/* <FeaturedPosts /> */}
                    <Posts />
                    <button
                        onClick={() => setIsPostOpen(true)}
                        className="mt-4 px-4 py-2 bg-[#DFC2F2] text-[#4A2C4A] font-semibold rounded-xl hover:bg-[#EAD6FF]"
                    >
                        Create Post
                    </button>
                </div>

                <aside className="w-1/4 bg-gray-100 p-6 rounded-xl sticky top-6 h-[calc(100vh-24px)] overflow-y-auto">
                    <Categories />
                    <TrendingPosts />
                </aside>
            </div>
        </div>
    );
}

export default MainPosts;
