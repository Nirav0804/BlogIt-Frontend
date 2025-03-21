import React from "react";

const ShimmerPostDetails = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 w-800 animate-pulse p-6">
          {/* Navbar Placeholder */}
          <div className="h-16 bg-gray-200 rounded mb-8"></div>
    
          {/* Post Content Placeholder */}
          <div className="max-w-4xl mx-auto px-4">
            {/* Title */}
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-8"></div>
    
            {/* Author Section */}
            <div className="flex items-center mb-8">
              <div className="h-14 w-14 bg-gray-300 rounded-full mr-5"></div>
              <div>
                <div className="h-5 bg-gray-200 rounded w-28 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
    
            {/* Main Image */}
            <div className="h-80 bg-gray-300 rounded mb-8"></div>
    
            {/* Text Content */}
            <div className="h-5 bg-gray-200 rounded w-full mb-5"></div>
            <div className="h-5 bg-gray-200 rounded w-full mb-5"></div>
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-8"></div>
    
            {/* Action Buttons */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
            </div>
    
            {/* Comments Section */}
            <div className="h-7 bg-gray-200 rounded w-1/4 mb-5"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-start space-x-5">
                  <div className="h-12 w-12 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
};

export default ShimmerPostDetails;
