import React from "react";

const categories = [
    "Sports", "Data Science", "Technology", "Health", "Education", "Finance",
    "Business", "Entertainment", "Art & Design", "Science", "Music", "Travel",
    "History", "Gaming", "Programming", "Others"
];

function CategoryItem({ name }) {
    return (
        <span className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-gray-400">
            {name}
        </span>
    );
}

function Categories() {
    return (
        <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
                {categories.map((category, index) => (
                    <CategoryItem key={index} name={category} />
                ))}
            </div>
        </div>
    );
}

export default Categories;
