import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function AddButton({ title, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="flex flex-row space-x-2 text-sm text-sky-500 justify-center items-center border border-sky-500 py-2 px-3 rounded-lg hover:bg-sky-500 hover:text-white shadow-sm"
      >
        <IoIosAddCircleOutline />
        <p>{title}</p>
      </button>
    </>
  );
}
