import axios from "axios";
import { useEffect, useState } from "react";
import PostCard from "./PostCrad";

function Posts() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/posts"
      );
      setPosts(response.data.posts);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);
  
  return (
    <section className="flex flex-col lg:flex-row gap-8 py-16 px-6 max-w-6xl mx-auto items-start">
      <div className="w-full lg:w-3/4 flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Start Reading</h2>
        
        {loading ? (
          <p className="text-center text-lg text-gray-600">Loading posts...</p>
        ) : error ? (
          <p className="text-center text-lg text-red-600">Error: {error}</p>
        ) : posts.length === 0 ? (
          <p className="text-center text-lg text-gray-600">
            No posts available.
          </p>
        ) : (
          posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </section>
  );
}

export default Posts;