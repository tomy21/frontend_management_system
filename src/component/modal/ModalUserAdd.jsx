import React, { useState } from "react";
import axios from "axios";

const AddUserModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    UserName: "",
    Initial: "",
    Email: "",
    Password: "",
    Role: "",
    Name: "",
    Address: "",
    PhoneNumber: "",
    Longitude: "",
    Latitude: "",
    CreatedBy: "system",
    AddressUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const extractLongLat = (url) => {
    const regex = /@(.*?),(.*?),/;
    const match = url.match(regex);
    if (match) {
      return { Longitude: match[1], Latitude: match[2] };
    }
    return { Longitude: "", Latitude: "" };
  };

  const handleAddressUrlChange = (e) => {
    const { value } = e.target;
    const { Longitude, Latitude } = extractLongLat(value);
    setFormData({ ...formData, AddressUrl: value, Longitude, Latitude });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3008/api/users", formData, {
        headers: { "Content-Type": "application/json" },
      });
      alert("User added successfully");
      onClose();
    } catch (error) {
      console.error("Error adding user", error);
      alert("Failed to add user");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-semibold mb-4">Add User</h2>
        <input
          name="UserName"
          placeholder="Username"
          value={formData.UserName}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="Initial"
          placeholder="Initial"
          value={formData.Initial}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="Email"
          type="email"
          placeholder="Email"
          value={formData.Email}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="Password"
          type="password"
          placeholder="Password"
          value={formData.Password}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <select
          name="Role"
          value={formData.Role}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        >
          <option value="">Select Role</option>
          <option value="1">Admin</option>
          <option value="2">User</option>
        </select>
        <input
          name="Name"
          placeholder="Name"
          value={formData.Name}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="Address"
          placeholder="Address"
          value={formData.Address}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="PhoneNumber"
          placeholder="Phone Number"
          value={formData.PhoneNumber}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
        />
        <input
          name="AddressUrl"
          placeholder="Address URL"
          value={formData.AddressUrl}
          onChange={handleAddressUrlChange}
          className="border p-2 w-full mb-2"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
