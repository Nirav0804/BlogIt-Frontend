import { Link } from "react-router-dom";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'; 

function Footer() {
    return (
        <footer className="bg-[#4E3A59] py-6 mt-12 text-white">
            <div className="container mx-auto text-center text-sm">
                <p>© 2025 BlogIt. All Rights Reserved.</p>
                <div className="flex justify-center gap-4 mt-4">
                    <Link to="/about" className="text-white hover:opacity-80 transition no-underline text-inherit">About</Link>
                    <Link to="/contact" className="text-white hover:opacity-80 transition no-underline text-inherit">Contact</Link>
                    <Link to="/privacy" className="text-white hover:opacity-80 transition no-underline text-inherit">Privacy Policy</Link>
                </div>
                <div className="flex justify-center gap-6 mt-4 no-underline text-inherit">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition no-underline text-inherit">
                        <FaInstagram className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition no-underline text-inherit">
                        <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition no-underline text-inherit">
                        <FaGithub className="w-6 h-6" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-80 transition no-underline text-inherit">
                        <FaTwitter className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
