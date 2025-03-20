import React from "react";
import { FaHeart, FaComment, FaThumbsUp } from "react-icons/fa"; // Icons for likes & comments
import { Link } from "react-router-dom";

function TrendingPosts({ posts }) {
    return (
        <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-700 mb-4">🔥 Trending Posts</h3>
            <div className="flex flex-wrap gap-3">
                {posts.map((post) => (
                    <div key={post.id} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm flex items-center gap-3 cursor-pointer hover:bg-gray-400">
                        <Link to={`/post/${post.id}`}>
                            <span className="font-medium">{post.title}</span>
                            <div className="flex items-center gap-1 text-xs text-gray-600">
                                <FaThumbsUp className="text-red-500" /> {post.likeCount}
                                <FaComment className="text-blue-500 ml-2" /> {post.commentCount}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TrendingPosts;
