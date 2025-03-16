import React, { useEffect, useState } from "react";
import { LocationApi } from "../../../Utils/LocationApi";
import { ScaleLoader } from "react-spinners";

export default function AddLocation({ isOpen, onClose, isSuccess }) {
  const [locationName, setLocationName] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [category, setCategory] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const extractCoordinates = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/; // Regex untuk menangkap latitude & longitude
    const match = url.match(regex);

    if (match) {
      setLatitude(match[1]); // Latitude
      setLongitude(match[2]); // Longitude
    }
  };

  useEffect(() => {
    if (shareUrl) {
      extractCoordinates(shareUrl);
    }
  }, [shareUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsLoading(true);
    const formData = {
      LocationName: locationName,
      Address: address,
      Longitude: longitude,
      Latitude: latitude,
      Type: category,
      ShareUrl: shareUrl,
    };

    try {
      const result = await LocationApi.create(formData); // Panggil fungsi API

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
            <h3 className="text-lg font-semibold">Add New Location</h3>
          </div>
          <div className="border border-slate-200 w-full my-2"></div>
          <div className="mt-4">
            <form onSubmit={handleSubmit} className="mt-4">
              {/* Type Name Input */}
              <div className="mb-4">
                <label htmlFor="locationName" className="block text-sm">
                  Location Name
                </label>
                <input
                  id="locationName"
                  type="text"
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter location name"
                  required
                />
              </div>

              {/* Initial Input */}
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm">
                  Address
                </label>
                <textarea
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Enter address"
                  cols={3}
                  rows={4}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm">
                  Category
                </label>
                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                >
                  <option value="">- Select Category -</option>
                  <option value="Home">Home</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Office">Office</option>
                  <option value="Project">Project</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="shareUrl" className="block text-sm">
                  Share Location URL
                </label>
                <input
                  id="shareUrl"
                  type="text"
                  value={shareUrl}
                  onChange={(e) => setShareUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                  placeholder="Paste Google Maps link here"
                />
              </div>

              {/* Description Input */}
              <div className="flex justify-between items-center w-full gap-2">
                <div className="mb-4">
                  <label htmlFor="longitude" className="block text-sm">
                    Longitude
                  </label>
                  <input
                    id="longitude"
                    type="text"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Longitude"
                  />
                </div>

                {/* Created By (default "admin") */}
                <div className="mb-4">
                  <label htmlFor="latitude" className="block text-sm">
                    Latitude
                  </label>
                  <input
                    id="latitude"
                    type="text"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm"
                    placeholder="Latitude"
                  />
                </div>
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
