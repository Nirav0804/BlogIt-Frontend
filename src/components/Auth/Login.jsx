import React from "react";

function Login({ onClose, onSwitchToSignUp }) {
    return (
        <div className="bg-[#77557C] p-8 rounded-2xl shadow-xl w-full max-w-md relative text-white border border-[#DFC2F2]">
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl">
                &times;
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>

            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Username or Email</label>
                    <input required type="text" className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg" placeholder="Enter your username or email" />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input required type="password" className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg" placeholder="Enter your password" />
                </div>

                <button type="submit" className="w-full py-3 bg-[#DFC2F2] text-[#4A2C4A] font-semibold rounded-xl hover:bg-[#EAD6FF]">
                    Log In
                </button>
            </form>

            <p className="text-center text-sm mt-4">
                Don't have an account?{" "}
                <span className="text-[#DFC2F2] hover:text-[#EAD6FF] underline cursor-pointer" onClick={() => { onClose(); onSwitchToSignUp(); }}>
                    Sign up
                </span>
            </p>
        </div>
    );
}

export default Login;
