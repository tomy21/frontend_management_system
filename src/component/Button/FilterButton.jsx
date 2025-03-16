import React from "react";
import { LuFilter } from "react-icons/lu";

export default function FilterButton({ title }) {
  return (
    <div>
      <button className="flex flex-row space-x-2 text-sm text-emerald-500 border border-emerald-400 justify-center items-center px-3 py-2 rounded-lg hover:bg-emerald-500 hover:text-white">
        <LuFilter />
        <p>{title}</p>
      </button>
    </div>
  );
}
