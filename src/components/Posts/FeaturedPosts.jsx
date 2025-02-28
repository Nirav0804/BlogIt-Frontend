import { useState } from "react";
import { FaHeart, FaCommentAlt, FaChevronUp, FaChevronDown, FaUserCircle } from "react-icons/fa";

const posts = [
    {
        id: 1,
        title: "How to Build a Blog",
        author: "John Doe",
        content: "This is a detailed blog post. It contains a lot of information on how to build a blog using modern technologies...",
        comments: [
            { id: 1, text: "Great article!", author: "Alice", likes: 12 },
            { id: 2, text: "Very helpful, thanks!", author: "Bob", likes: 8 },
        ],
    },
    {
        id: 2,
        title: "React vs Vue",
        author: "Jane Smith",
        content: "In this post, we compare React and Vue, two of the most popular front-end JavaScript frameworks...",
        comments: [
            { id: 1, text: "I prefer React.", author: "Charlie", likes: 5 },
            { id: 2, text: "Vue has its own strengths.", author: "Dave", likes: 7 },
        ],
    },
];

function FeaturedPosts() {
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [likedComments, setLikedComments] = useState({});
    const [visibleComments, setVisibleComments] = useState({});
    const [expandedPost, setExpandedPost] = useState(null);
    const [newComment, setNewComment] = useState("");

    const handleLikePost = (postId) => {
        setLikedPosts((prev) => {
            const newLikedPosts = new Set(prev);
            newLikedPosts.has(postId) ? newLikedPosts.delete(postId) : newLikedPosts.add(postId);
            return newLikedPosts;
        });
    };

    const handleLikeComment = (postId, commentId) => {
        setLikedComments((prev) => {
            const postComments = prev[postId] || {};
            postComments[commentId] ? delete postComments[commentId] : postComments[commentId] = true;
            return { ...prev, [postId]: postComments };
        });
    };

    const toggleComments = (postId) => {
        setVisibleComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
    };

    const toggleReadMore = (postId) => {
        setExpandedPost((prev) => (prev === postId ? null : postId));
    };

    const truncateContent = (content) => {
        const wordLimit = 50;
        return content.split(" ").length > wordLimit
            ? content.split(" ").slice(0, wordLimit).join(" ") + "..."
            : content;
    };

    return (
        <section className="py-16 px-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Trending Articles</h2>
            <div className="space-y-8">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                            <FaUserCircle className="text-gray-600 text-2xl" />
                            <p className="text-lg font-semibold text-gray-700">{post.author}</p>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mt-3">{post.title}</h3>
                        <p className="mt-3 text-gray-700">
                            {expandedPost === post.id ? post.content : truncateContent(post.content)}
                        </p>
                        {post.content.split(" ").length > 50 && (
                            <button
                                onClick={() => toggleReadMore(post.id)}
                                className="text-blue-500 font-medium mt-2 flex items-center"
                            >
                                {expandedPost === post.id ? "Read Less" : "Read More"}
                                <span className="ml-2">
                                    {expandedPost === post.id ? <FaChevronUp /> : <FaChevronDown />}
                                </span>
                            </button>
                        )}
                        <div className="mt-5">
                            <button onClick={() => toggleComments(post.id)} className="text-blue-500 font-medium flex items-center">
                                <FaCommentAlt className="mr-2" />
                                {visibleComments[post.id] ? "Hide Comments" : "Show Comments"}
                            </button>
                            {visibleComments[post.id] && (
                                <div className="mt-3 max-h-56 overflow-y-auto space-y-4">
                                    {post.comments.map((comment) => (
                                        <div key={comment.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                                            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-800">{comment.author}</p>
                                                <p className="text-gray-600">{comment.text}</p>
                                            </div>
                                            <button
                                                onClick={() => handleLikeComment(post.id, comment.id)}
                                                className={`flex items-center ${likedComments[post.id]?.[comment.id] ? "text-red-500" : "text-gray-500"}`}
                                            >
                                                <FaHeart className="mr-1" />
                                                {comment.likes + (likedComments[post.id]?.[comment.id] ? 1 : 0)}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        {visibleComments[post.id] && (
                            <div className="mt-4">
                                <textarea
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="w-full p-2 border rounded-lg"
                                    rows="3"
                                    placeholder="Add a comment..."
                                ></textarea>
                                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">Add Comment</button>
                            </div>
                        )}
                        <div className="flex justify-between items-center mt-5">
                            <button
                                onClick={() => handleLikePost(post.id)}
                                className={`flex items-center space-x-2 px-4 py-2 border rounded-lg ${likedPosts.has(post.id) ? "bg-red-500 text-white" : "bg-gray-200 text-gray-700"}`}
                            >
                                <FaHeart className="text-lg" />
                                <span>
                                    {post.comments.reduce((sum, comment) => sum + comment.likes, 0) + (likedPosts.has(post.id) ? 1 : 0)}
                                </span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedPosts;