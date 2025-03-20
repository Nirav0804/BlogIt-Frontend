import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaHeart,
  FaCommentAlt,
  FaUser,
  FaRegBookmark,
  FaBookmark,
  FaShareAlt,
  FaRegHeart,
  FaThumbsUp,
  FaArrowLeft,
} from "react-icons/fa";
import { format } from "date-fns";
import PostCard from "./PostCrad";
import MainNavbar from "../Navigation/MainNavbar";

// Separate components for better organization
const UserAvatar = ({ user }) => {
  return (
    <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden mr-4">
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt={user.username}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="h-full w-full flex items-center justify-center bg-gray-800 text-white text-xl font-bold">
          {user.username.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

const Comment = ({ comment }) => {
  return (
    <div className="border-b border-gray-100 pb-6 last:border-b-0">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden mr-4">
          {comment.avatarUrl ? (
            <img
              src={comment.avatarUrl}
              alt={comment.username}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-800 text-white text-lg font-bold">
              {comment.username.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-1">
            <h4 className="font-medium text-gray-900">{comment.username}</h4>
            <span className="mx-2 text-gray-300">·</span>
            <span className="text-sm text-gray-500">
              {comment.createdAt
                ? format(new Date(comment.createdAt), "MMM d")
                : "Recently"}
            </span>
          </div>
          <p className="text-gray-800">{comment.content}</p>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <button className="flex items-center hover:text-gray-700 transition duration-200">
              <FaRegHeart className="h-4 w-4 mr-1" />
              <span>{comment.likes || 0}</span>
            </button>
            <span className="mx-2">·</span>
            <button className="hover:text-gray-700 transition duration-200">
              Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="animate-pulse flex flex-col w-full max-w-3xl px-4">
      <div className="bg-gray-200 h-8 w-24 mb-12 rounded"></div>
      <div className="bg-gray-200 h-12 w-full mb-6 rounded"></div>
      <div className="bg-gray-200 h-4 w-1/3 mb-8 rounded"></div>
      <div className="bg-gray-200 h-64 w-full mb-8 rounded"></div>
      <div className="bg-gray-200 h-4 w-full mb-4 rounded"></div>
      <div className="bg-gray-200 h-4 w-full mb-4 rounded"></div>
      <div className="bg-gray-200 h-4 w-2/3 mb-8 rounded"></div>
    </div>
  </div>
);

const ErrorDisplay = ({ error, navigate }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Error Loading Post
      </h2>
      <p className="text-gray-700 mb-6">{error}</p>
      <button
        onClick={() => navigate(-1)}
        className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300"
      >
        Go Back
      </button>
    </div>
  </div>
);

function PostDetails({ postId }) {
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [estimatedReadTime, setEstimatedReadTime] = useState("5 min");
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/posts/${postId}`
        );
        setPost(response.data);

        // Calculate estimated read time based on content length
        const wordsPerMinute = 200;
        const wordCount = response.data.content.split(/\s+/).length;
        const readTime = Math.ceil(wordCount / wordsPerMinute);
        setEstimatedReadTime(`${readTime} min read`);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostDetails();
    }
  }, [postId]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      if (!post || !post.category || !post.category.id) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/category/${post.category.id}/posts?limit=3`
        );
        // Filter out the current post from related posts
        const filteredPosts = response.data.filter((p) => p.id !== post.id);
        setRelatedPosts(filteredPosts.slice(0, 3)); // Limit to 3 related posts
      } catch (err) {
        console.error("Error fetching related posts:", err);
        // Don't set error state here to avoid disrupting the main post view
      }
    };

    fetchRelatedPosts();
  }, [post]);

  const handleLike = async () => {
    try {
      // Optimistic update
      setIsLiked(!isLiked);

      // Here you would make an API call to update the like status
      // const response = await axios.post(`http://localhost:8080/api/v1/posts/${postId}/like`);

      // Update the post with the new like count from the API response
      // setPost(prevPost => ({
      //   ...prevPost,
      //   likeCount: response.data.likeCount
      // }));
    } catch (err) {
      // Revert on error
      setIsLiked(isLiked);
      console.error("Error updating like status:", err);
    }
  };

  const handleBookmark = async () => {
    try {
      // Optimistic update
      setIsBookmarked(!isBookmarked);

      // Here you would make an API call to update the bookmark status
      // const response = await axios.post(`http://localhost:8080/api/v1/posts/${postId}/bookmark`);
    } catch (err) {
      // Revert on error
      setIsBookmarked(isBookmarked);
      console.error("Error updating bookmark status:", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      // Here you would make an API call to submit the comment
      // const response = await axios.post(`http://localhost:8080/api/v1/posts/${postId}/comments`, {
      //   content: commentText
      // });

      // Update the post with the new comment
      // setPost(prevPost => ({
      //   ...prevPost,
      //   comments: [response.data, ...prevPost.comments],
      //   commentCount: prevPost.commentCount + 1
      // }));

      setCommentText("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorDisplay error={error} navigate={navigate} />;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">

      <MainNavbar />
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-10 bg-white shadow-sm border-b border-gray-200 w-full">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-500 hover:text-gray-700 transition duration-300"
            >
              <FaArrowLeft className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBookmark}
                className="text-gray-500 hover:text-gray-700 transition duration-300"
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                {isBookmarked ? (
                  <FaBookmark className="h-5 w-5" />
                ) : (
                  <FaRegBookmark className="h-5 w-5" />
                )}
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 transition duration-300"
                aria-label="Share post"
              >
                <FaShareAlt className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-screen-md mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          {post.category && (
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full mb-4">
              {post.category.categoryName}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center mb-6">
            <UserAvatar user={post.user} />
            <div className="flex-1">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {post.user.username}
                </p>
                <span className="mx-2 text-gray-300">·</span>
              </div>
              <div className="flex items-center flex-wrap text-sm text-gray-500">
                <span>
                  {post.createdAt
                    ? format(new Date(post.createdAt), "MMM d, yyyy")
                    : "Recently"}
                </span>
                <span className="mx-1">·</span>
                <span>{estimatedReadTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.imageUrl && (
          <figure className="mb-10">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-auto max-h-96 object-cover rounded-lg shadow-md"
            />
            {post.imageCaption && (
              <figcaption className="text-sm text-gray-500 mt-2 text-center italic">
                {post.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-800 mb-6 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Article Footer */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition duration-300"
                aria-label={isLiked ? "Unlike post" : "Like post"}
              >
                {isLiked ? (
                  <FaHeart className="h-5 w-5 text-red-500" />
                ) : (
                  <FaRegHeart className="h-5 w-5" />
                )}
                <span>{post.likeCount + (isLiked ? 1 : 0)}</span>
              </button>
              <button
                className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition duration-300"
                aria-label="View comments"
              >
                <FaCommentAlt className="h-5 w-5" />
                <span>{post.commentCount}</span>
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBookmark}
                className="text-gray-500 hover:text-gray-700 transition duration-300"
                aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              >
                {isBookmarked ? (
                  <FaBookmark className="h-5 w-5" />
                ) : (
                  <FaRegBookmark className="h-5 w-5" />
                )}
              </button>
              <button
                className="text-gray-500 hover:text-gray-700 transition duration-300"
                aria-label="Share post"
              >
                <FaShareAlt className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="max-w-screen-md mx-auto w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Responses ({post.commentCount})
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex items-start mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden mr-4">
                {/* Current user avatar would go here */}
                <div className="h-full w-full flex items-center justify-center bg-gray-800 text-white text-lg font-bold">
                  U
                </div>
              </div>
              <div className="flex-1">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a response..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-300"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!commentText.trim()}
                className={`px-4 py-2 rounded-full ${commentText.trim()
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
                  } transition duration-300`}
              >
                Respond
              </button>
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-6">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-2">No responses yet</p>
                <p className="text-gray-700 font-medium">
                  Be the first to respond!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12 px-4 w-full">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Articles
            </h2>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}

export default PostDetails;
