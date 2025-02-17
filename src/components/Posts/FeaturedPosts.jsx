import { Link } from "react-router-dom";
import { useState } from "react";
import { FaHeart, FaCommentAlt } from "react-icons/fa";

const posts = [
    {
        id: 1,
        title: "How to Build a Blog",
        author: "John Doe",
        content: "This is a detailed blog post. It contains a lot of information on.",
        comments: [
            { id: 1, text: "Great article!", author: "Alice", likes: 12 },
            { id: 2, text: "Very helpful, thanks!", author: "Bob", likes: 8 },
        ],
    },
    {
        id: 2,
        title: "React vs Vue",
        author: "Jane Smith",
        content: "In this post, we compare React and Vue, two of the most popular front-end JavaScript frameworks. React is widely used, but Vue has gained traction for its simplicity and flexibility. We'll go through the differences in architecture, performance, and learning curve. React provides a more robust ecosystem, while Vue is known for its ease of integration. This post will give you a clear understanding of both frameworks and help you make the right choice for your next project. To read more about this comparison, click 'Read More'.",
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
            if (newLikedPosts.has(postId)) {
                newLikedPosts.delete(postId);
            } else {
                newLikedPosts.add(postId);
            }
            return newLikedPosts;
        });
    };

    const handleLikeComment = (postId, commentId) => {
        setLikedComments((prev) => {
            const postComments = prev[postId] || {};
            if (postComments[commentId]) {
                delete postComments[commentId];
            } else {
                postComments[commentId] = true;
            }
            return { ...prev, [postId]: postComments };
        });
    };

    const toggleComments = (postId) => {
        setVisibleComments((prev) => ({
            ...prev,
            [postId]: !prev[postId],
        }));
    };

    const toggleReadMore = (postId) => {
        setExpandedPost((prev) => (prev === postId ? null : postId));
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (postId) => {
        if (newComment.trim()) {
            const updatedPosts = posts.map((post) => {
                if (post.id === postId) {
                    post.comments.push({ id: post.comments.length + 1, text: newComment, author: "User", likes: 0 });
                }
                return post;
            });
            setNewComment("");
            // Optional: Update state with new posts, e.g., `setPosts(updatedPosts);`
        }
    };

    const truncateContent = (content) => {
        const wordLimit = 70; // Update word limit to 70
        const words = content.split(" ");
        return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : content;
    };

    return (
        <section className="py-16 px-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-8">Trending Articles</h2>
            <div className="space-y-8">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-8 rounded-lg shadow-lg">
                        <h3 className="text-3xl font-semibold text-gray-800">{post.title}</h3>
                        <p className="text-gray-500 text-lg mt-2">By {post.author}</p>

                        {/* Post Content */}
                        <p
                            className={`mt-4 text-gray-700 transition-all duration-500 ease-in-out ${expandedPost === post.id ? "opacity-100 max-h-none" : "opacity-50 max-h-48 overflow-hidden"
                                }`}
                        >
                            {expandedPost === post.id ? post.content : truncateContent(post.content)}
                        </p>

                        {/* Read More / Read Less */}
                        {post.content.split(" ").length > 70 && (
                            <button
                                onClick={() => toggleReadMore(post.id)}
                                className="text-blue-500 font-medium mt-4 block"
                            >
                                {expandedPost === post.id ? "Read Less" : "Read More"}
                            </button>
                        )}

                        {/* Comments */}
                        <div className="mt-6">
                            <button
                                onClick={() => toggleComments(post.id)}
                                className="text-blue-500 font-medium"
                            >
                                <FaCommentAlt className="inline-block mr-2" /> {visibleComments[post.id] ? "Hide Comments" : "Show Comments"}
                            </button>
                            {visibleComments[post.id] && (
                                <div className="space-y-4 mt-4">
                                    <div
                                        className="max-h-48 overflow-y-auto"
                                        style={{ maxHeight: "200px" }}
                                    >
                                        {post.comments.map((comment) => (
                                            <div key={comment.id} className="flex items-start space-x-4 p-4 border-t border-gray-200">
                                                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                                                <div className="flex-1">
                                                    <p className="font-semibold text-gray-700">{comment.author}</p>
                                                    <p className="text-gray-600">{comment.text}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleLikeComment(post.id, comment.id)}
                                                    className={`flex items-center ${likedComments[post.id]?.[comment.id] ? "text-red-500" : "text-gray-500"}`}
                                                >
                                                    <FaHeart className="mr-2" />
                                                    {comment.likes + (likedComments[post.id]?.[comment.id] ? 1 : 0)}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Add New Comment */}
                                    <div className="mt-4">
                                        <textarea
                                            value={newComment}
                                            onChange={handleCommentChange}
                                            className="w-full p-2 border border-gray-300 rounded-lg"
                                            rows="3"
                                            placeholder="Add a comment..."
                                        ></textarea>
                                        <button
                                            onClick={() => handleCommentSubmit(post.id)}
                                            className="mt-2 text-white bg-blue-500 px-4 py-2 rounded-lg"
                                        >
                                            Add Comment
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Like Button */}
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={() => handleLikePost(post.id)}
                                className={`flex items-center text-gray-500 ${likedPosts.has(post.id) ? "text-red-500" : ""}`}
                            >
                                <FaHeart className={`mr-2 ${likedPosts.has(post.id) ? "text-red-500" : ""}`} />
                                {post.comments.reduce((sum, comment) => sum + comment.likes, 0) + (likedPosts.has(post.id) ? 1 : 0)}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedPosts;
