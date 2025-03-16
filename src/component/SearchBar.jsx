import React from "react";

const SearchBar = () => {
  return (
    <div className="">
      <input
        type="text"
        placeholder="Search orders..."
        className="w-full border border-gray-300 px-3 py-1 rounded text-sm"
      />
    </div>
  );
};

export default SearchBar;
