import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TitleHeaders from "../../component/TitleHeaders";
import { OrdersApi } from "../../Utils/OrderApi";
import { ScaleLoader } from "react-spinners";
import { format } from "date-fns";
import ConsultantCard from "../../component/CardConsultant";

export default function DetailOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataDetailOrder, setDataDetailOrder] = useState([]);
  const [pendingConsultants, setPendingConsultants] = useState({});
  const { id } = useParams();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Quantity: "",
    Status: "Available",
  });

  useEffect(() => {
    fetchDataDetail();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchDataDetail = async () => {
    setIsLoading(true);
    try {
      const response = await OrdersApi.getById(id);
      console.log(response);
      setDataDetailOrder(response);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/materials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Material added successfully!");
        setShowForm(false);
        setFormData({ Name: "", Quantity: "", Status: "Available" });
      } else {
        alert("Failed to add material");
      }
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  const materialName = [
    { name: "Pencil", value: "pencil" },
    { name: "Pen", value: "pen" },
    { name: "Papper", value: "Papper" },
    { name: "Absensi Partisipan", value: "Absensi Partisipan" },
    { name: "Laptop", value: "laptop" },
    { name: "Print Materi", value: "Print Materi" },
  ];

  const consultantsList = [
    { name: "Pencil", value: "pencil" },
    { name: "Pen", value: "pen" },
    { name: "Papper", value: "Papper" },
    { name: "Absensi Partisipan", value: "Absensi Partisipan" },
    { name: "Laptop", value: "laptop" },
    { name: "Print Materi", value: "Print Materi" },
  ];

  const handleSaveConsultants = () => {
    fetchDataDetail();
  };

  // console.log(dataDetailOrder.Consultants);

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center mb-3 z-30">
            <ScaleLoader size={250} color={"#ffff"} loading={true} />
          </div>
        </div>
      )}
      <TitleHeaders
        title={"Detail Order"}
        subtitle={"Manage your order here"}
      />

      <div className="mt-2">
        <div className="flex flex-col justify-start items-start w-full border-b border-slate-200 py-2">
          <div className="flex flex-row justify-start items-center space-x-5">
            <h1 className="text-xl font-semibold">{dataDetailOrder.OrderId}</h1>
            <div className="bg-blue-50 text-blue-500 p-2 rounded-md">
              {dataDetailOrder.Status}
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm text-slate-500">
              Created Date :{" "}
              {dataDetailOrder.createdAt
                ? format(new Date(dataDetailOrder.CreatedAt), "dd MMMM yyyy")
                : "Loading..."}
            </p>
            <div className="flex flex-row justify-end items-center space-x-3 text-sm">
              <button
                onClick={() => window.history.back()}
                className="px-5 py-1 border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white"
              >
                Back
              </button>
              <button className="px-5 py-1 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-500 hover:text-white">
                Print
              </button>
              <button className="px-5 py-1 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white">
                Upload materi
              </button>
              <button className="px-5 py-1 border border-cyan-500 text-cyan-500 rounded-md hover:bg-cyan-500 hover:text-white">
                Upload payment
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-start items-start w-full space-x-5 py-2 border-b border-slate-200">
          <div className="flex flex-col justify-start items-start w-full">
            <h1 className="text-slate-500 font-semibold text-lg ">
              Detail Order
            </h1>
            <p className="text-slate-300 text-sm ">
              {dataDetailOrder.Consultants?.length} Mandays
            </p>
          </div>
          <div className="bg-blue-50 text-blue-500 px-3 py-1 rounded-md">
            {dataDetailOrder.ClassMode}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm mt-3">
          <tr>
            <td className="py-2 text-slate-400 w-40">Order ID </td>
            <td className="py-2 text-slate-400 w-3">: </td>
            <td className="py-2"> {dataDetailOrder.OrderId}</td>
          </tr>
          <tr>
            <td className="py-2 text-slate-400 w-40">Service Type </td>
            <td className="py-2 text-slate-400 w-3">: </td>
            <td className="py-2"> {dataDetailOrder.ServiceType}</td>
          </tr>
          <tr>
            <td className="py-2 text-slate-400 w-40">Company Name </td>
            <td className="py-2 text-slate-400 w-3">:</td>
            <td className="py-2"> {dataDetailOrder.Client?.CompanyName}</td>
          </tr>
          <tr>
            <td className="py-2 text-slate-400 w-40">Email Client</td>
            <td className="py-2 text-slate-400 w-3">:</td>
            <td className="py-2"> {dataDetailOrder.Client?.Email}</td>
          </tr>
          <tr>
            <td className="py-2 text-slate-400 w-40">Address Client</td>
            <td className="py-2 text-slate-400 w-3">:</td>
            <td className="py-2"> {dataDetailOrder.Address}</td>
          </tr>
          <tr>
            <td className="py-2 text-slate-400 w-40">Total Partisipant</td>
            <td className="py-2 text-slate-400 w-3">:</td>
            <td className="py-2"> {dataDetailOrder.CountPartisipan}</td>
          </tr>
        </div>

        <div className="my-2">
          <label htmlFor="title" className="text-sm text-slate-400">
            Title
          </label>
          <p>{dataDetailOrder.Title}</p>
        </div>
        <div className="my-2">
          <label htmlFor="title" className="text-sm text-slate-400">
            Description
          </label>
          <p>{dataDetailOrder.Description}</p>
        </div>

        <h1 className="text-slate-400 font-semibold text-lg py-2 border-y border-slate-200 mt-5">
          Consultan Detail
        </h1>

        <div className="flex justify-between items-center text-sm mt-3">
          <ConsultantCard
            dataDetailOrder={dataDetailOrder.ServiceOrderConsultants ?? []}
            consultantsListProps={dataDetailOrder.Consultants ?? []}
            onSuccess={handleSaveConsultants}
          />
        </div>

        <div className="flex flex-row justify-start items-start w-full space-x-5 py-2 border-y border-slate-200 mt-10">
          <div className="flex flex-col justify-start items-start w-full">
            <h1 className="text-slate-400 font-semibold text-lg ">
              Material Detail
            </h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-50 text-blue-500 px-3 py-2 rounded-md text-sm whitespace-nowrap hover:bg-blue-100"
          >
            Add Material
          </button>
        </div>
        {!showForm ? (
          <div className="flex flex-col justify-center items-center w-full space-x-5 py-2 mt-5">
            <img src="/empty-box.svg" className="w-40 opacity-50" alt="" />
            <h1 className="text-slate-300">Material Not Found</h1>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-5 p-4 border rounded-lg shadow-lg bg-white"
          >
            <div className="mb-3">
              <label className="block text-gray-700">Name</label>
              {/* <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              /> */}
              <select
                name="Name"
                id="Name"
                value={formData.Name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="-">Select material</option>
                {materialName.map((items, index) => (
                  <option key={index} value={items.value}>
                    {items.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                name="Quantity"
                value={formData.Quantity}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                placeholder="Enter quantity"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
