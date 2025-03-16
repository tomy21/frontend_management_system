import React, { useState } from "react";
import { ServiceTypeApi } from "../../../Utils/ServiceTypeApi";
import { ScaleLoader } from "react-spinners";

export default function Add({ isOpen, onClose, isSuccess }) {
  const [typeName, setTypeName] = useState("");
  const [initial, setInitial] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("admin");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsLoading(true);
    const formData = {
      TypeName: typeName,
      Initial: initial,
      Description: description,
      CreatedBy: createdBy,
    };

    try {
      const result = await ServiceTypeApi.createServiceType(formData); // Panggil fungsi API

      if (result.status === "success") {
        console.log("Service Type added successfully:", result);
        onClose();
        isSuccess();
      } else {
        console.error("Failed to add Service Type:", result);
      }
    } catch (error) {
      console.error("Error adding Service Type:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center mb-3 z-30">
            <ScaleLoader size={250} color={"#ffff"} loading={true} />
          </div>
        </div>
      )}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
        <div className="bg-white p-4 rounded-md w-96">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Add New Data</h3>
          </div>
          <div className="border border-slate-200 w-full my-2"></div>
          <div className="mt-4">
            <form onSubmit={handleSubmit} className="mt-4">
              {/* Type Name Input */}
              <div className="mb-4">
                <label htmlFor="typeName" className="block text-sm">
                  Service Type
                </label>
                <input
                  id="typeName"
                  type="text"
                  value={typeName}
                  onChange={(e) => setTypeName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter service type"
                  required
                />
              </div>

              {/* Initial Input */}
              <div className="mb-4">
                <label htmlFor="initial" className="block text-sm">
                  Initial
                </label>
                <input
                  id="initial"
                  type="text"
                  value={initial}
                  onChange={(e) => setInitial(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter initials"
                  required
                />
              </div>

              {/* Description Input */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter description"
                  required
                />
              </div>

              {/* Created By (default "admin") */}
              <div className="mb-4">
                <label htmlFor="createdBy" className="block text-sm">
                  Created By
                </label>
                <input
                  id="createdBy"
                  type="text"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Created By"
                  readOnly
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded-md text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
