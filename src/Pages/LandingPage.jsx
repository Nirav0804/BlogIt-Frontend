import GradientBackground from "../components/GradiantBackground/GradiantBackground";
import Landing from "../components/Landing/Landing";

function LandingPage() {
    return (
        <GradientBackground>
            <div className="bg-gray-50 min-h-screen">
                <Landing />
            </div>
        </GradientBackground>
    );
}

export default LandingPage;
