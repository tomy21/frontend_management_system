import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useClientProvider } from "../../Context/ClientProvider";
import { useServiceType } from "../../Context/ServiceTypeProvider";
import { OrdersApi } from "../../Utils/OrderApi";
import { ScaleLoader } from "react-spinners";

export default function OrderModal({ isOpen, onClose, isSuccess }) {
  const [client, setClient] = useState("");
  const [serviceTypes, setServiceTypes] = useState("");
  const [manDays, setManDays] = useState([]);
  const [countParticipants, setCountParticipants] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [addressUrl, setAddressUrl] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [classMode, setClassMode] = useState("Online");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { clientData } = useClientProvider();
  const { serviceType } = useServiceType();

  const handleDateChange = (date) => {
    if (date && !manDays.find((d) => d.getTime() === date.getTime())) {
      setManDays([...manDays, date]);
    }
  };

  const extractCoordinates = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/; // Regex untuk menangkap latitude & longitude
    const match = url.match(regex);

    if (match) {
      setLatitude(match[1]); // Latitude
      setLongitude(match[2]); // Longitude
    }
  };

  useEffect(() => {
    if (addressUrl) {
      extractCoordinates(addressUrl);
    }
  }, [addressUrl]);

  const removeDate = (dateToRemove) => {
    setManDays(manDays.filter((date) => date !== dateToRemove));
  };

  // Kirim Data ke API
  const handleSubmit = async () => {
    setIsLoading(true);
    const data = {
      ClientId: client,
      ServiceTypeId: serviceTypes,
      ManDays: {
        dates: manDays.map((date) => date.toISOString().split("T")[0]),
      },
      CountPartisipan: countParticipants,
      Title: title,
      Description: description,
      Address: address,
      AddressUrl: addressUrl,
      Longitude: longitude,
      Latitude: latitude,
      ClassMode: classMode,
      Contact: email,
    };

    console.log(data);

    try {
      const response = await OrdersApi.create(data);
      console.log(response);
      onClose();
      isSuccess();
    } catch (error) {
      alert("Gagal menambahkan order!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-40">
          <div className="flex items-center justify-center mb-3 z-50">
            <ScaleLoader size={250} color={"#ffff"} loading={true} />
          </div>
        </div>
      )}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
        <div className="modal modal-open">
          <div className="modal-box w-full max-w-2xl p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Add Order
            </h2>

            <div className="border border-slate-200 w-full"></div>
            <form>
              {/* Client Dropdown */}
              <div className="flex flex-row justify-start items-center w-full space-x-3 mt-2">
                <div className="mb-3 w-full">
                  <select
                    className="select select-bordered w-full"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                  >
                    <option value="" disabled>
                      Select Client
                    </option>
                    {clientData.map((client, index) => (
                      <option key={index} value={client.Id}>
                        {client.CompanyName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service Type */}
                <div className="mb-3 w-full">
                  <select
                    className="select select-bordered w-full"
                    value={serviceTypes}
                    onChange={(e) => setServiceTypes(e.target.value)}
                  >
                    <option value="" disabled>
                      Service Type
                    </option>
                    {serviceType.map((serviceType, index) => (
                      <option key={index} value={serviceType.Id}>
                        {serviceType.TypeName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date Picker dengan Dropdown */}
              <div className="mb-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select Dates"
                    readOnly
                    value={manDays
                      .map((date) => date.toLocaleDateString())
                      .join(", ")}
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className="input input-bordered w-full cursor-pointer"
                  />
                  {isDatePickerOpen && (
                    <div className="absolute z-50 mt-2 bg-white border rounded shadow-lg p-2">
                      <DatePicker
                        selected={null} // Tidak set `selected`, biar bisa multiple
                        onChange={handleDateChange}
                        minDate={new Date()} // Tidak bisa pilih tanggal lampau
                        inline
                      />
                      <button
                        className="btn btn-sm mt-2 w-full"
                        onClick={() => setIsDatePickerOpen(false)}
                      >
                        Done
                      </button>
                    </div>
                  )}
                </div>
                {/* Tanggal yang dipilih */}
                <div className="mt-2 flex flex-wrap gap-2">
                  {manDays.map((date, index) => (
                    <div key={index} className="badge badge-primary gap-2">
                      {date.toLocaleDateString()}
                      <button
                        onClick={() => removeDate(date)}
                        className="text-white ml-1"
                      >
                        ✖
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <input
                id="addressUrl"
                type="text"
                name="addressUrl"
                value={addressUrl}
                onChange={(e) => setAddressUrl(e.target.value)}
                className="input input-bordered w-full mb-3"
                placeholder="Paste Google Maps link here"
              />

              <textarea
                name="address"
                id="address"
                cols={20}
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="textarea textarea-bordered w-full mb-3"
                placeholder="Enter Address"
              />

              {/* Participants Count & Title */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <input
                  type="text"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className="input input-bordered w-full"
                />
                <input
                  type="text"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Participants Count"
                  value={countParticipants}
                  onChange={(e) => setCountParticipants(e.target.value)}
                  className="input input-bordered w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              {/* Contact Email */}
              <div className="flex justify-between items-center w-full gap-x-4">
                <input
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input input-bordered w-full mt-3"
                />
                <select
                  name="classMode"
                  id="classMode"
                  className="input input-bordered w-full mt-3"
                  value={classMode}
                  onChange={(e) => setClassMode(e.target.value)}
                >
                  <option value="Online">Online</option>
                  <option value="Offline">Offline</option>
                </select>
              </div>

              <textarea
                name="description"
                id="description"
                cols={20}
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="textarea textarea-bordered w-full mt-3"
                placeholder="Description"
              />

              {/* Action Buttons */}
              <div className="modal-action mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
