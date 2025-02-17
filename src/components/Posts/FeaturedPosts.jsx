import { Link } from "react-router-dom";

const posts = [
    { id: 1, title: "How to Build a Blog", author: "John Doe" },
    { id: 2, title: "React vs Vue", author: "Jane Smith" },
];

function FeaturedPosts() {
    return (
        <section className="py-10 px-6 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Trending Articles</h2>
            <div className="space-y-4">
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-4 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold">{post.title}</h3>
                        <p className="text-gray-500 text-sm">By {post.author}</p>
                        <Link to={`/post/${post.id}`} className="text-blue-500 font-medium mt-2 inline-block">
                            Read More →
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedPosts;
