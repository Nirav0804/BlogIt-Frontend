import React from "react";

function SignUp({ onClose }) {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
                &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input required type="text" className="w-full px-4 py-2 mt-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input required type="email" className="w-full px-4 py-2 mt-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input required type="password" className="w-full px-4 py-2 mt-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">About</label>
                    <textarea className="w-full px-4 py-2 mt-2 border rounded-md" rows="4"></textarea>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
