import React from "react";
import { useNavigate } from "react-router-dom";

const categories = {
    1: "Sports",
    2: "Technology",
    3: "Data Science",
    4: "Health & Wellness",
    5: "Education",
    6: "Finance",
    7: "Gaming",
    8: "Entertainment",
    9: "Travel",
    10: "Food",
    11: "Lifestyle",
    12: "Science",
    13: "Business",
    14: "History",
    15: "Politics",
    16: "Others",
};

function CategoryItem({ id, name }) {
    const navigate = useNavigate();

    return (
        <span
            onClick={() => navigate(`/category/${id}`)}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-gray-400"
        >
            {name}
        </span>
    );
}

function Categories() {
    return (
        <div className="bg-gray-100 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-gray-700 mb-4">Categories</h3>
            <div className="flex flex-wrap gap-3">
                {Object.entries(categories).map(([id, name]) => (
                    <CategoryItem key={id} id={id} name={name} />
                ))}
            </div>
        </div>
    );
}

export default Categories;
