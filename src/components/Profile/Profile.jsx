import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PostCard from "../Posts/PostCrad";
const Profile = () => {
    // const username = "Nirav Patel";
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState("");
    const [currentUserName, setCurrentUserName] = useState("");
    const [activeTab, setActiveTab] = useState("Your Blog");
    const [blogData, setBlogData] = useState({
        "Your Blog": [],
        "Liked Blogs": [],
        "Commented Blogs": []
    });
    const tabs = ["Your Blog", "Liked Blogs", "Commented Blogs"];
    useEffect(() => {
        const userId = localStorage.getItem("userId");
        if (!userId) {
            navigate("/")
        }
        setCurrentUserId(userId);

        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/users/${userId}`);
                console.log(response.data);
                setCurrentUserName(response.data.username);
            }
            catch {
                console.log("Unable to fetch User.");

            }
        }
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userId");
        navigate("/")
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;

                if (activeTab === "Your Blog") {
                    response = await axios.get(`http://localhost:8080/api/v1/user/${currentUserId}/posts`);
                } else if (activeTab === "Liked Blogs") {
                    response = await axios.get(`http://localhost:8080/api/v1/user/${currentUserId}/liked/posts`);
                } else if (activeTab === "Commented Blogs") {
                    response = await axios.get(`http://localhost:8080/api/v1/user/${currentUserId}/commented/posts`);
                }

                if (response && response.data) {
                    setBlogData((prevData) => ({ ...prevData, [activeTab]: response.data }));
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        if (currentUserId) {
            fetchData();
        }
    }, [activeTab, currentUserId]);


    return (
        <div className="flex flex-col min-h-screen p-6">
            {/* User Info Section */}
            <div className="flex justify-between items-center bg-[#4E3A59] text-white p-4 rounded-lg w-full mb-6 shadow-lg">
                <div className="flex items-center">
                    <FaUserCircle size={30} className="mr-4" />
                    <h2 className="text-3xl font-semibold">{currentUserName}</h2>
                </div>

                {/* Buttons Container */}
                <div className="flex items-center gap-4">
                    <Link to="/posts">
                        <button className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 transition duration-200">
                            All Posts
                        </button>
                    </Link>
                    <button className="bg-red-500 px-4 py-2 rounded-lg text-white hover:bg-red-600 transition duration-200" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
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
                                <div key={index}>
                                    <PostCard post={blog} />
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