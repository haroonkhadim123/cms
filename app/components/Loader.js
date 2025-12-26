"use client";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="flex  items-center gap-3">
        
        {/* Spinner */}
        <div className="w-1 h-1 border-4 border-white-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-white-700 font-semibold text-sm">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loader;
