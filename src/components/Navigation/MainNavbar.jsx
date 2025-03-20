import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaUser } from "react-icons/fa";
import CreatePost from "../Posts/CreatePost";

function MainNavbar() {
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
          <button
            className="p-3 bg-green-500 hover:bg-green-600 rounded-full"
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus className="text-white text-xl" />
          </button>

          <Link to="/profile">
            <div className="p-3 bg-gray-800 rounded-full cursor-pointer">
              <FaUser className="text-white text-xl" />
            </div>
          </Link>
        </div>
      </nav>

      <CreatePost isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default MainNavbar;
