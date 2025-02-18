import { Link } from "react-router-dom";

function Navbar({ onOpenSignUpModal, onOpenLoginModal }) {
    return (
        <header className="bg-[#77557C] text-white shadow-md py-4">
            <div className="container mx-auto flex justify-between items-center px-6">

                <Link to="/" className="flex items-center gap-x-2">
                    <span className="text-3xl font-bold text-white">BlogIt</span>
                </Link>

                <nav className="space-x-6 hidden md:flex">
                    <Link to="/" className="hover:text-gray-300">Home</Link>
                    <Link to="/about" className="hover:text-gray-300">About</Link>
                    <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                </nav>

                <div className="space-x-4">
                    <button
                        onClick={onOpenLoginModal} // Open Login Modal
                        className="px-6 py-3 bg-orange-400 text-white rounded-lg hover:bg-orange-600"
                    >
                        Log in
                    </button>
                    <button
                        onClick={onOpenSignUpModal} // Open SignUp Modal
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Navbar;
