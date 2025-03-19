import { FaHeart, FaCommentAlt, FaThumbsUp, FaUser } from "react-icons/fa";
import DefaultImage from "../../assets/DefaultImage.png";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <Link to={`/post/${post.id}`} className="no-underline text-inherit">
      <div className="bg-cyan-50 p-6 rounded-xl shadow-lg border border-gray-200 flex justify-between items-center hover:shadow-xl transition">
        <div className="flex-1 pr-1">
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <FaUser className="mr-2 text-gray-700" />
            <span className="font-medium">{post.user.username}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {post.title}
          </h3>
          <p className="text-gray-700 mt-2">
            {post.content.slice(0, 100)}...
          </p>
          <div className="mt-3 flex space-x-4 text-gray-600">
            <span className="flex items-center">
              <FaThumbsUp className="mr-1 text-red-500" /> {post.likeCount}
            </span>
            <span className="flex items-center">
              <FaCommentAlt className="mr-1 text-blue-500" /> {post.commentCount}
            </span>
          </div>
        </div>
        
        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden">
          <img
            src={post.imageUrl || DefaultImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </Link>
  );
}

export default PostCard;