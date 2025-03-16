import React, { useEffect, useState } from "react";
import { ClientApi } from "../../../Utils/apiManageClient";
import { ScaleLoader } from "react-spinners";

export default function EditClient({ isOpen, onClose, isSuccess, id }) {
  const [formData, setFormData] = useState({
    CompanyName: "",
    Initial: "",
    Address: "",
    Email: "",
    PhoneNumber: "",
    Longitude: "",
    Latitude: "",
    CreatedBy: "",
    AddressUrl: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await ClientApi.getByid(id);
        console.log(response);
        setFormData((prevFormData) => ({
          ...prevFormData,
          CompanyName: response.CompanyName,
          Initial: response.Initial,
          Address: response.Address,
          Email: response.Email,
          PhoneNumber: response.PhoneNumber,
          Longitude: response.Longitude,
          Latitude: response.Latitude,
          CreatedBy: response.CreatedBy,
          AddressUrl: response.AddressUrl,
        }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const extractCoordinates = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/; // Regex untuk menangkap latitude & longitude
    const match = url.match(regex);

    if (match) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Latitude: match[1],
        Longitude: match[2],
      }));
    }
  };

  useEffect(() => {
    if (formData.AddressUrl) {
      extractCoordinates(formData.AddressUrl);
    }
  }, [formData.AddressUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await ClientApi.updateClient(id, formData);
      setIsLoading(false);
      onClose();
      isSuccess();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="flex items-center justify-center mb-3 z-50">
            <ScaleLoader size={250} color={"#ffff"} loading={true} />
          </div>
        </div>
      )}
      <div className="fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
          <div className="flex items-center mb-4 border-b border-gray-200 pb-3">
            <h2 className="text-xl font-semibold mb-1">Add Client</h2>
          </div>
          <div className="space-y-4">
            {/* Fields */}
            <div className="flex justify-between gap-2">
              <div className="w-full">
                <label
                  htmlFor="CompanyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  id="CompanyName"
                  type="text"
                  name="CompanyName"
                  value={formData?.CompanyName || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter Company Name"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="Initial"
                  className="block text-sm font-medium text-gray-700"
                >
                  Initial
                </label>
                <input
                  id="Initial"
                  type="text"
                  name="Initial"
                  value={formData?.Initial || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter Initial"
                />
              </div>
            </div>
            {/* More Fields */}
            {/* Add more input fields similar to the above */}
            <div className="flex justify-between gap-2">
              <div className="w-full">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="Email"
                  type="email"
                  name="Email"
                  value={formData?.Email || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter Email"
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="PhoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  id="PhoneNumber"
                  type="text"
                  name="PhoneNumber"
                  value={formData?.PhoneNumber || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="AddressUrl" className="block text-sm">
                Share Location URL
              </label>
              <input
                id="AddressUrl"
                type="text"
                name="AddressUrl"
                value={formData?.AddressUrl || ""}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                placeholder="Paste Google Maps link here"
              />
            </div>

            <div className="flex justify-between gap-2">
              <div className="w-full">
                <label
                  htmlFor="Longitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Longitude
                </label>
                <input
                  id="Longitude"
                  type="text"
                  name="Longitude"
                  value={formData?.Longitude || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter Longitude"
                  readOnly
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="Latitude"
                  className="block text-sm font-medium text-gray-700"
                >
                  Latitude
                </label>
                <input
                  id="Latitude"
                  type="text"
                  name="Latitude"
                  value={formData?.Latitude || ""}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter Latitude"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-3 pt-5 border-t border-slate-200">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-300 rounded-md text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
