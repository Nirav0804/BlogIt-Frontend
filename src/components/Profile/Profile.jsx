import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
    const username = "Nirav Patel";
    const [activeTab, setActiveTab] = useState("Your Blog");
    const [blogData, setBlogData] = useState({
        "Your Blog": [],
        "Liked Blogs": [],
        "Commented Blogs": []
    });

    const tabs = ["Your Blog", "Liked Blogs", "Commented Blogs"];

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (activeTab === "Your Blog") {
                    response = await fetch("/api/user-blogs");
                } else if (activeTab === "Liked Blogs") {
                    response = await fetch("/api/liked-blogs");
                } else if (activeTab === "Commented Posts") {
                    response = await fetch("/api/commented-posts");
                }

                if (response) {
                    const data = await response.json();
                    setBlogData((prevData) => ({ ...prevData, [activeTab]: data }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [activeTab]);

    return (
        <div className="flex flex-col min-h-screen p-6">
            {/* User Info Section */}
            <div className="flex justify-between items-center bg-[#4E3A59] text-white p-4 rounded-lg w-full mb-6 shadow-lg">
                <div className="flex items-center">
                    <FaUserCircle size={50} className="mr-4" />
                    <h2 className="text-xl font-semibold">{username}</h2>
                </div>
                <button className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition duration-200">Logout</button>
            </div>

            <div className="flex flex-1">
                <div className="w-1/4 bg-[#4E3A59] text-white p-4 rounded-lg shadow-lg">
                    <div className="space-y-3">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                className={`block w-full text-left px-4 py-2 rounded-lg transition duration-200 ${activeTab === tab ? "bg-white text-[#4E3A59] font-semibold shadow-md" : "hover:bg-[#6A4A6F]"
                                    }`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-3/4 bg-white p-6 ml-6 shadow-lg rounded-lg border border-gray-300">
                    <h2 className="text-2xl font-semibold text-[#4E3A59] mb-4">{activeTab}</h2>
                    <div>
                        {blogData[activeTab].length > 0 ? (
                            blogData[activeTab].map((blog, index) => (
                                <div key={index} className="mb-4 p-4 border rounded-lg shadow bg-gray-50">
                                    <h3 className="text-xl font-semibold text-[#4E3A59]">{blog.title}</h3>
                                    <p className="text-gray-700">{blog.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">No data available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;