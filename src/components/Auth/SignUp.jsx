import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function SignUp({ onClose, onSwitchToLogin }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        about: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`http://localhost:8080/api/v1/users`, formData);
            localStorage.setItem("userId", response.data.id);
            navigate("/posts")
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#77557C] p-8 rounded-2xl shadow-xl w-full max-w-md relative text-white border border-[#DFC2F2]">
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl">
                &times;
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                        required
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg"
                        placeholder="Choose a username"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg"
                        placeholder="Enter your email"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        required
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg"
                        placeholder="Create a password"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">About</label>
                    <textarea
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                        className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg"
                        rows="4"
                        placeholder="Tell us about yourself"
                    ></textarea>
                </div>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <button
                    type="submit"
                    className="w-full py-3 bg-[#DFC2F2] text-[#4A2C4A] font-semibold rounded-xl hover:bg-[#EAD6FF] disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            <p className="text-center text-sm mt-4">
                Already have an account?{" "}
                <span
                    className="text-[#DFC2F2] hover:text-[#EAD6FF] underline cursor-pointer"
                    onClick={() => {
                        onClose();
                        onSwitchToLogin();
                    }}
                >
                    Log in
                </span>
            </p>
        </div>
    );
}

export default SignUp;
