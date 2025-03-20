import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login({ onClose, onSwitchToSignUp }) {
    const [formData, setFormData] = useState({
        usernameOrEmail: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("http://localhost:8080/api/v1/users/login", formData);

            console.log("Login successful:", response.data);
            localStorage.setItem("userId", response.data.id);
            navigate("/posts");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="bg-[#77557C] p-8 rounded-2xl shadow-xl w-full max-w-md relative text-white border border-[#DFC2F2]">
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl">
                &times;
            </button>

            <h2 className="text-3xl font-bold mb-6 text-center">Log In</h2>

            {error && <p className="text-red-400 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Username or Email</label>
                    <input
                        required
                        type="text"
                        name="usernameOrEmail"
                        value={formData.usernameOrEmail}
                        onChange={handleChange}
                        className="w-full px-4 py-3 mt-1 bg-[#E8D5E5] text-[#4A2C4A] rounded-lg"
                        placeholder="Enter your username or email"
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
                        placeholder="Enter your password"
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full py-3 bg-[#DFC2F2] text-[#4A2C4A] font-semibold rounded-xl hover:bg-[#EAD6FF] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Log In"}
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
