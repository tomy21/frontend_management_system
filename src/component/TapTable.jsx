import React, { useState } from "react";
import { MdFilterList, MdSearch } from "react-icons/md";
import { TbColumns3 } from "react-icons/tb";
import { GoDownload, GoPlus } from "react-icons/go";
import AddUserModal from "./modal/ModalUserAdd";
import axios from "axios";

function TapTable({
  listTab,
  activeTab,
  setActiveTab,
  tabPage,
  tabValue,
  setTabValue,
  add,
  addAction,
}) {
  const [modalAdd, setModalAdd] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
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

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    // onClose();
  };

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    const initials = value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join(""); // Ambil huruf pertama tiap kata dan gabungkan
    setFormData({ ...formData, UserName: value, Initial: initials });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const extractLongLat = (url) => {
    const regex = /@([-]?\d+\.\d+),([-]?\d+\.\d+)/;
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
      await axios.post("http://localhost:3008/api/v.01/users", formData, {
        headers: { "Content-Type": "application/json" },
      });
      // alert("User added successfully");
      isSuccessModalOpen(true);
      // onClose();
    } catch (error) {
      console.error("Error adding user", error);
      alert("Failed to add user");
    }
  };
  return (
    <>
      <div className="flex justify-between items-center w-full border-b mt-5">
        <div className="flex">
          {listTab.map((tab, index) => (
            <button
              key={index}
              className={`flex items-center px-4 py-4 text-sm font-medium gap-x-2 ${
                activeTab === tab.name
                  ? "text-amber-600 border-b-2 border-amber-600"
                  : "text-gray-500"
              }`}
              onClick={() => [setActiveTab(tab.name), setTabValue(tab.value)]}
            >
              {tab.name}
            </button>
          ))}
        </div>

        <div className="flex flex-row justify-end items-center space-x-2 px-3">
          <button className="border border-slate-300 p-2 rounded-md flex flex-row justify-center items-center space-x-2">
            <MdSearch size={20} />
          </button>
          <button className="border border-slate-300 p-2 rounded-md flex flex-row justify-center items-center space-x-2">
            <MdFilterList />
            <h1 className="text-sm">Filter</h1>
          </button>
          <button className="border border-slate-300 p-2 rounded-md flex flex-row justify-center items-center space-x-2">
            <TbColumns3 />
            <h1 className="text-sm">Columns</h1>
          </button>
          <div className="border-r border-slate-300 h-7"></div>

          <button className="flex items-center bg-gradient-to-t from-blue-300 to-blue-500 text-white rounded-md p-2 hover:opacity-80 shadow-inner shadow-blue-500">
            <GoDownload className="mr-2" />
            <h1 className="text-sm"> Export</h1>
          </button>
          <button
            className="flex items-center bg-gradient-to-t from-amber-300 to-amber-500 text-white rounded-md p-2 hover:opacity-80 shadow-inner shadow-amber-500"
            onClick={() => setModalAdd(true)}
          >
            <GoPlus className="mr-2" />
            <h1 className="text-sm"> Add New</h1>
          </button>
        </div>
      </div>

      {modalAdd && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-2/3">
            {" "}
            {/* Perbesar modal */}
            <h2 className="text-xl font-semibold mb-4">Add User</h2>
            {/* Grid untuk form input */}
            <div className="grid grid-cols-2 gap-4">
              <input
                name="UserName"
                placeholder="Username"
                value={formData.UserName}
                onChange={handleUsernameChange} // Ubah jadi handleUsernameChange
                className="border p-2 w-full"
              />
              <input
                name="Initial"
                placeholder="Initial"
                value={formData.Initial}
                readOnly // Biar tidak bisa diedit manual
                className="border p-2 w-full bg-gray-100"
              />
              <input
                name="Email"
                type="email"
                placeholder="Email"
                value={formData.Email}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                name="Password"
                type="password"
                placeholder="Password"
                value={formData.Password}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <select
                name="Role"
                value={formData.Role}
                onChange={handleChange}
                className="border p-2 w-full"
              >
                <option value="">Select Role</option>
                <option value="2">Cosultant</option>
                <option value="3">Marketing</option>
                <option value="4">Admin</option>
                <option value="5">Finance</option>
              </select>
              <input
                name="Name"
                placeholder="Name"
                value={formData.Name}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                name="Address"
                placeholder="Address"
                value={formData.Address}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                name="PhoneNumber"
                placeholder="Phone Number"
                value={formData.PhoneNumber}
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                name="AddressUrl"
                placeholder="Address URL"
                value={formData.AddressUrl}
                onChange={handleAddressUrlChange}
                className="border p-2 w-full col-span-2"
              />
              <input
                name="Longitude"
                placeholder="Longitude"
                value={formData.Longitude}
                readOnly
                className="border p-2 w-full bg-gray-100"
              />
              <input
                name="Latitude"
                placeholder="Latitude"
                value={formData.Latitude}
                readOnly
                className="border p-2 w-full bg-gray-100"
              />

              {/* Tombol Submit & Cancel (col-span-2 agar melebar di bawah) */}
              <div className="col-span-2 flex justify-end space-x-2">
                <button
                  onClick={() => setModalAdd(false)}
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
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Berhasil!</h2>
            <p className="text-gray-700 mb-4">Data berhasil disimpan.</p>
            <button
              onClick={closeSuccessModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-md w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default TapTable;
