import { FaUser, FaThumbsUp, FaCommentAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function ShimmerPostCard() {
  return (
    <div className="bg-cyan-50 p-6 rounded-xl shadow-lg border border-gray-200 flex justify-between items-center animate-pulse">
      <div className="flex-1 pr-1">
        <div className="flex items-center text-gray-500 text-sm mb-2">
          <FaUser className="mr-2 text-gray-700" />
          <div className="bg-gray-300 h-4 w-24 rounded-md shimmer-effect"></div>
        </div>
        <div className="bg-gray-300 h-6 w-3/4 rounded-md mb-2 shimmer-effect"></div>
        <div className="bg-gray-300 h-4 w-5/6 rounded-md shimmer-effect"></div>
        <div className="bg-gray-300 h-4 w-4/6 rounded-md mt-2 shimmer-effect"></div>
        <div className="mt-3 flex space-x-4 text-gray-600">
          <div className="flex items-center">
            <FaThumbsUp className="mr-1 text-gray-400" />
            <div className="bg-gray-300 h-4 w-6 rounded-md shimmer-effect"></div>
          </div>
          <div className="flex items-center">
            <FaCommentAlt className="mr-1 text-gray-400" />
            <div className="bg-gray-300 h-4 w-6 rounded-md shimmer-effect"></div>
          </div>
        </div>
      </div>
      <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-lg bg-gray-300 shimmer-effect"></div>
    </div>
  );
}

export default ShimmerPostCard;

