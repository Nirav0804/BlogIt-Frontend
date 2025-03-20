import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaUser } from "react-icons/fa";
import CreatePost from "../Posts/CreatePost";

function CategoryNavbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <nav className="top-0 left-0 w-full bg-[#4E3A59] text-white py-4 px-6 flex items-center justify-between shadow-md z-50">
                <Link to="/" className="flex items-center gap-x-2">
                    <span className="text-3xl font-bold text-white">BlogIt</span>
                </Link>

                <div className="flex-1 mx-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="h-8 w-50 p-2 rounded-xl bg-gray-400 text-black focus:outline-none"
                    />
                </div>

                <div className="flex items-center gap-x-4">

                    <Link to="/posts">
                        <button className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition duration-200">
                            All Posts
                        </button>
                    </Link>

                    <Link to="/profile">
                        <div className="p-3 bg-gray-800 rounded-full cursor-pointer">
                            <FaUser className="text-white text-xl" />
                        </div>
                    </Link>
                </div>
            </nav>
        </>
    );
}

export default CategoryNavbar;
