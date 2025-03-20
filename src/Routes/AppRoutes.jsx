import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../Pages/LandingPage";
import PostPage from "../Pages/PostPage";
import SignUp from "../components/Auth/SignUp";
import Login from "../components/Auth/Login";
import CreatePost from "../components/Posts/CreatePost";
import ProfilePage from "../Pages/ProfilePage";
import PostDetailsPage from "../Pages/PostDetailsPage";
import CategoryPosts from "../components/Posts/CategoryPosts";

function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/posts" element={<PostPage />} />
                <Route path="/post/:id" element={<PostDetailsPage />} />
                {/* <Route path="/login" element={<Login />} /> */}
                {/* <Route path="/signup" element={<SignUp />} /> */}
                {/* <Route path="/create_post" element={<CreatePost />} /> */}
                <Route path="/category/:id" element={<CategoryPosts />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/*" element={<>Page Not Found</>} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
