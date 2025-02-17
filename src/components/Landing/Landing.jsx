import { Link } from "react-router-dom";
import GradientBackground from "../GradiantBackground/GradiantBackground";
import Navbar from "../Navigation/Navbar";
import Footer from "../Footer/Footer";
import "animate.css";  // Importing animate.css

function Landing() {
    return (
        <GradientBackground>
            <Navbar />
            <section className="min-h-screen flex items-center justify-between px-6 py-16">
                <div className="container mx-auto flex flex-col md:flex-row items-center">
                    {/* Text Section */}
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
        </GradientBackground>
    );
}

export default Landing;
