import { useState } from "react";

function Login({ onClose }) {
    const [emailOrUsername, setEmailOrUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login data:", { emailOrUsername, password });
        onClose();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
                &times;
            </button>
            <h2 className="text-2xl font-semibold mb-4">Log In</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email or Username</label>
                    <input
                        type="text"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email or username"
                        value={emailOrUsername}
                        onChange={(e) => setEmailOrUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;
