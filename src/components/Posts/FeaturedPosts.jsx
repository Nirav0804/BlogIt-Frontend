import { FaHeart, FaCommentAlt } from "react-icons/fa";
import Categories from "./Categories";

const categories = [
    "Sports", "Data Science", "Technology", "Health", "Education", "Finance",
    "Business", "Entertainment", "Art & Design", "Science", "Music", "Travel",
    "History", "Gaming", "Programming", "Others"
];

const posts = [
    {
        id: 1,
        title: "How to Build a Blog",
        author: "John Doe",
        image: "https://via.placeholder.com/150",
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
        image: "https://via.placeholder.com/150",
        content: "In this post, we compare React and Vue, two of the most popular front-end JavaScript frameworks...",
        comments: [
            { id: 1, text: "I prefer React.", author: "Charlie", likes: 5 },
            { id: 2, text: "Vue has its own strengths.", author: "Dave", likes: 7 },
        ],
    },
];

function FeaturedPosts() {
    return (
        <section className="flex flex-col lg:flex-row gap-8 py-16 px-6 max-w-6xl mx-auto items-start">
            {/* Left Section: All Posts */}
            <div className="w-full lg:w-3/4 flex flex-col gap-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Trending Articles</h2>
                {posts.map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 flex hover:shadow-xl transition">
                        <img src={post.image} alt={post.title} className="w-32 h-32 object-cover rounded-lg mr-4" />
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold text-gray-900">{post.title}</h3>
                            <p className="text-gray-700 mt-2">{post.content.slice(0, 100)}...</p>
                            <div className="mt-3 flex space-x-4 text-gray-600">
                                <span className="flex items-center">
                                    <FaHeart className="mr-1 text-red-500" /> {post.comments.reduce((sum, c) => sum + c.likes, 0)}
                                </span>
                                <span className="flex items-center">
                                    <FaCommentAlt className="mr-1 text-blue-500" /> {post.comments.length}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Section: Categories */}
            <aside className="w-full lg:w-1/4 bg-gray-100 p-6 rounded-xl self-start">
                <Categories />
            </aside>
        </section>
    );
}

export default FeaturedPosts;
