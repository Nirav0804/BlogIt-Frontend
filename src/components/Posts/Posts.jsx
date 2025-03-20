import React from "react";
import PostCard from "./PostCard";
import ShimmerPostCard from "./ShimmerPostCard";

function Posts({ posts, searchQuery, loading, error }) {
  const filteredPosts = searchQuery
    ? posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery)
    )
    : posts;

  // Shimmer loading effect component
  // const ShimmerPostCard = () => (
  //   <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
  //     <div className="w-full h-48 bg-gray-200"></div>
  //     <div className="p-4">
  //       <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
  //       <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
  //       <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
  //       <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
  //       <div className="flex items-center mt-4">
  //         <div className="h-8 w-8 bg-gray-200 rounded-full mr-3"></div>
  //         <div className="h-4 bg-gray-200 rounded w-1/4"></div>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <section className="flex flex-col lg:flex-row gap-8 py-16 px-6 max-w-6xl mx-auto items-start">
      <div className="w-full lg:w-3/4 flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Start Reading</h2>

        {loading ? (
          // Show multiple shimmer cards when loading
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, index) => (
              <ShimmerPostCard key={index} />
            ))}
          </div>
        ) : error ? (
          <p className="text-center text-lg text-red-600">Error: {error}</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No matching posts found.
          </p>
        ) : (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </section>
  );
}

export default Posts;