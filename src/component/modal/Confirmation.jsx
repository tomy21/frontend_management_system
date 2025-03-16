import React from "react";
import { BsTrash3 } from "react-icons/bs";

export default function Confirmation({ isOpen, onClose, submit }) {
  const handleDelete = () => {
    submit();
  };
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
        <div className="bg-white p-4 rounded-md w-96">
          <div className="flex flex-col justify-center items-center space-y-5">
            <div className="flex flex-col justify-center items-center space-y-3">
              <BsTrash3 size={60} className="text-red-500" />
              <h3 className="text-lg font-semibold">
                Are you sure you want to delete?
              </h3>
            </div>
            <h2 className="text-sm text-slate-500 text-center">
              This action cannot be undone. All values associated with this
              field will be lost.
            </h2>
          </div>
          <div className="flex flex-row justify-center items-center w-full mt-5 space-x-5">
            <button
              onClick={handleClose}
              className="bg-white text-emerald-500 border border-emerald-500 px-5 py-2 rounded-md w-32"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-5 py-2 rounded-md w-32"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
