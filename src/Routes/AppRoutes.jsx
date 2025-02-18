import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import PostPage from "../Pages/PostPage";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/posts" element={<PostPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
