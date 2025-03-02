import React from "react";
import { FaHeart, FaComment, FaThumbsUp } from "react-icons/fa"; // Icons for likes & comments

function TrendingPosts() {
    const trendingPosts = [
        { id: 1, title: "How to Master React", author: "John Doe", likes: 120, comments: 45 },
        { id: 2, title: "Understanding JavaScript Closures", author: "Jane Smith", likes: 98, comments: 30 },
        { id: 3, title: "Top 10 CSS Tricks for Developers", author: "Alice Johnson", likes: 85, comments: 25 },];

    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">🔥 Trending Posts</h3>
            <div className="flex flex-wrap gap-3">
                {trendingPosts.map((post) => (
                    <div key={post.id} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center gap-3 cursor-pointer hover:bg-gray-400">
                        <span className="font-medium">{post.title}</span>
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                            <FaThumbsUp className="text-red-500" /> {post.likes}
                            <FaComment className="text-blue-500 ml-2" /> {post.comments}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendingPosts;
