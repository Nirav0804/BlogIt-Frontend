import { useState } from "react";
import GradientBackground from "../GradiantBackground/GradiantBackground";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import SignUp from "../Auth/SignUp";
import Login from "../Auth/Login";
import "animate.css";

function Landing() {
    const [isSignUpOpen, setIsSignUpOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleOpenSignUp = () => setIsSignUpOpen(true);
    const handleOpenLogin = () => setIsLoginOpen(true);

    const handleCloseSignUp = () => setIsSignUpOpen(false);
    const handleCloseLogin = () => setIsLoginOpen(false);

    const handleBackdropClick = (e) => {
        if (e.target.id === "modalBackdrop") {
            handleCloseSignUp();
            handleCloseLogin();
        }
    };

    return (
        <GradientBackground>
            <Navbar onOpenSignUpModal={handleOpenSignUp} onOpenLoginModal={handleOpenLogin} />

            <section className={`min-h-screen flex items-center justify-between px-6 py-16 relative ${isSignUpOpen || isLoginOpen ? 'backdrop-blur-sm' : ''}`}>
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <div className="animate__animated animate__fadeIn animate__faster">
                            <h1 className="text-8xl font-bold leading-tight mb-6 text-gray-900">
                                Share Your Story with the World
                            </h1>
                            <p className="text-3xl mb-8 opacity-80 text-gray-700">
                                Publish articles, connect with readers, and grow your audience.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
            {isSignUpOpen && (
                <div
                    id="modalBackdrop"
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleBackdropClick} // Close the modal if clicked outside
                >
                    <SignUp onClose={handleCloseSignUp} />
                </div>
            )}
            {isLoginOpen && (
                <div
                    id="modalBackdrop"
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50"
                    onClick={handleBackdropClick} // Close the modal if clicked outside
                >
                    <Login onClose={handleCloseLogin} />
                </div>
            )}
        </GradientBackground>
    );
}

export default Landing;
