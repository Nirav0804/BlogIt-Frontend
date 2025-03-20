import React from "react";
import PostCard from "./PostCrad";

function Posts({ posts, searchQuery, loading, error }) {
  const filteredPosts = searchQuery
    ? posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery)
    )
    : posts;

  return (
    <section className="flex flex-col lg:flex-row gap-8 py-16 px-6 max-w-6xl mx-auto items-start">
      <div className="w-full lg:w-3/4 flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Start Reading</h2>

        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading posts...</p>
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
