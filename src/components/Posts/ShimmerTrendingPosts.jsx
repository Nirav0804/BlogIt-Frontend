import React from "react";
import { FaHeart, FaCommentAlt, FaThumbsUp } from "react-icons/fa"; // Icons for likes & comments
import { Link } from "react-router-dom";

const ShimmerTrendingPosts = () => {
    return (
        <div className="mt-6">
            <div className="flex flex-wrap gap-3">
                {[...Array(7)].map((_, index) => (
                    <div 
                        key={index} 
                        className="bg-cyan-50 p-4 rounded-xl shadow-md border border-gray-200 w-full overflow-hidden relative"
                    >
                        <div className="h-5 bg-gray-300 rounded-md w-3/4 mb-3 shimmer-effect"></div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 bg-gray-300 rounded-md w-12 shimmer-effect"></div>
                            <div className="h-4 bg-gray-300 rounded-md w-12 shimmer-effect"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default ShimmerTrendingPosts;