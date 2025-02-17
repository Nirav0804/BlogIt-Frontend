import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'; // Importing social media icons

function Footer() {
    return (
        <footer className="bg-gray-900 py-6 mt-12">
            <div className="container mx-auto text-center text-sm text-gray-400">
                <p>© 2025 MyBlog. All Rights Reserved.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <Link to="/about" className="hover:text-white">About</Link>
                    <Link to="/contact" className="hover:text-white">Contact</Link>
                    <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaInstagram className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaGithub className="w-6 h-6" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                        <FaTwitter className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
