import { Link } from "react-router-dom";

function Navbar() {
    return (
        <header className="bg-gray-900 text-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">
                {/* Logo */}
                <Link to="/" className="text-3xl font-bold text-white">
                    MyBlog
                </Link>

                {/* Navigation */}
                <nav className="space-x-6 hidden md:flex">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/about" className="hover:text-gray-300">About</Link>
                    <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                </nav>

                {/* Auth Buttons */}
                <div className="space-x-4">
                    <Link to="/login" className="text-white hover:text-gray-300">Log in</Link>
                    <Link to="/signup" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
