import React from "react";
import { Link } from "react-router-dom";

function SignUp({ onClose, onSwitchToLogin }) {
    return (
        <div className="bg-[#77557C] p-8 rounded-2xl shadow-xl w-full max-w-md relative text-white border border-[#DFC2F2]">
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl">
                &times;
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

            <form>
                {/* Username */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input required type="text" className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg" placeholder="Choose a username" />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input required type="email" className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg" placeholder="Enter your email" />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input required type="password" className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg" placeholder="Create a password" />
                </div>

                {/* About */}
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">About</label>
                    <textarea className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg" rows="4" placeholder="Tell us about yourself"></textarea>
                </div>

                {/* Sign Up Button */}
                <button type="submit" className="w-full py-3 bg-[#DFC2F2] text-[#4A2C4A] font-semibold rounded-xl hover:bg-[#EAD6FF]">
                    Sign Up
                </button>
            </form>

            {/* Switch to Login */}
            <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <span className="text-[#DFC2F2] hover:text-[#EAD6FF] underline cursor-pointer" onClick={() => { onClose(); onSwitchToLogin(); }}>
                    Log in
                </span>
            </p>
        </div >
    );
}

export default SignUp;
