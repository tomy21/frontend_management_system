import React from "react";
import { AiOutlineCloudDownload } from "react-icons/ai";

export default function ExportButton({ title }) {
  return (
    <div>
      <button className="flex flex-row space-x-2 text-sm text-emerald-500 border border-emerald-500 justify-center items-center px-3 py-2 rounded-lg hover:bg-emerald-500 hover:text-white">
        <AiOutlineCloudDownload />
        <p>{title}</p>
      </button>
    </div>
  );
}
