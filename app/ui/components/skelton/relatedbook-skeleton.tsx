import React from "react";

export default function RelatedBookSkeleton() {
  return (
    <div className="flex gap-4 py-4 animate-pulse">
      {/* Book Image */}
      <div className="w-30 h-40 bg-gray-300 rounded"></div>

      {/* Book Info */}
      <div className="flex flex-col justify-center  flex-1 gap-2">
        {/* Title */}
        <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
        {/* Author */}
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        {/* Reviews */}
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  );
}
