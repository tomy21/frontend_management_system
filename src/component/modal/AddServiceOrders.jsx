import React, { useState, useEffect } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Loading from '../Loading'; // Komponen loading
import DatePicker from "react-multi-date-picker";
import { clientData, serviceOrders, serviceType } from '../../Utils/apiManageClient';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';
import { Users } from '../../Utils/ApiUsers';

// Function to extract Longitude and Latitude from Google Maps URL
const extractLongLatFromUrl = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const matches = url.match(regex);
    if (matches) {
        return {
            latitude: matches[1],
            longitude: matches[2]
        };
    }
    return {
        latitude: "",
        longitude: ""
    };
};

export default function AddServiceOrders({ showModal, setShowModal }) {
    const [dates, setDates] = useState([]);
    const [formData, setFormData] = useState({
        ClientId: "",
        ServiceTypeId: "",
        ManDays: "",
        CountPartisipan: "",
        Title: "", // Default role
        Description: "",
        Address: "",
        AddressUrl: "",
        ServiceType: "",
        ClassMode: "",
        Contact: "",
        Longitude: "",
        Latitude: "",
        CreatedBy: "system"
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataClient, setDataClient] = useState([]);
    const [dataService, setDataService] = useState([]);
    const [idUser, setIdUser] = useState(null);
    const [name, setName] = useState(" ");
    const navigate = useNavigate();

    // Validasi form sebelum submit
    const validateForm = () => {
        const newErrors = {};
        if (!formData.ClientId.trim()) newErrors.ClientId = "UserName is required";
        if (!formData.ServiceTypeId.trim()) newErrors.ServiceTypeId = "Name is required";
        if (!formData.Address.trim()) newErrors.Address = "Address is required";
        if (!formData.AddressUrl.trim()) newErrors.AddressUrl = "AddressUrl is required";
        if (!formData.ManDays || formData.ManDays.length === 0) errors.push("ManDays is required");

        return newErrors;
    };

    // Auto-extract Longitude and Latitude dari Address URL
    useEffect(() => {
        const { longitude, latitude } = extractLongLatFromUrl(formData.AddressUrl);
        setFormData((prevData) => ({
            ...prevData,
            Longitude: longitude,
            Latitude: latitude
        }));


        const fetchToken = async () => {
            const token = Cookies.get("refreshToken");
            if (!token) {
                navigate("/");
            }
            if (token) {
                const decodedToken = jwtDecode(token);
                setIdUser(decodedToken.Id);
            }
        };
        fetchToken();

        fetchClient()
        fetchServiceType()
    }, [formData.AddressUrl]);

    useEffect(() => {
        const fetchUser = async () => {
            setTimeout(async () => {
                if (idUser) {
                    const response = await Users.getById(idUser);
                    console.log(response)
                    setName(response.data.user.UserName);
                }
            }, 500);
        };

        fetchUser();
    }, [idUser]);


    const fetchClient = async () => {
        try {
            const response = await clientData.getAll();
            console.log(response);
            setDataClient(response.data);
        } catch (error) {
            console.error("Failed to fetch clients:", error);
            setLoading(false);
        }
    };
    const fetchServiceType = async () => {
        try {
            const response = await serviceType.getAll();
            console.log(response);
            setDataService(response.data);
        } catch (error) {
            console.error("Failed to fetch clients:", error);
            setLoading(false);
        }
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

    };


    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const dataClientById = await clientData.getByid(formData.ClientId);
        const dataServiceById = await serviceType.getById(formData.ServiceTypeId);


        const submissionData = {
            ...formData,
            UserId: idUser,
            CreatedBy: name,
            Contact: dataClientById.Email,
            ServiceType: dataServiceById.TypeName,
            ManDays: [
                {
                    dates: dates.map(date => date.format('YYYY-MM-DD'))
                }
            ],
        };


        setLoading(true);
        try {
            const response = await serviceOrders.postData(submissionData);
            console.log("data", response);
            setTimeout(() => {
                setLoading(false);
                setShowSuccessModal(true);
                setTimeout(() => {
                    setShowSuccessModal(false);
                    setShowModal(false);
                }, 3000);
            }, 2000);
        } catch (error) {
            setApiError(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {loading ? (
                <Loading />
            ) : (
                <div className="bg-white rounded-lg w-[70%] p-6 relative">
                    <h2 className="text-xl font-bold">Create Service Orders</h2>
                    <div className='border-b border-slate-400 w-full my-4'></div>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Client Name */}
                            <div className="mb-1 w-full">
                                <label className="block text-sm font-medium text-gray-700">Client Name</label>
                                <select
                                    name="ClientId"
                                    value={formData.ClientId}
                                    onChange={handleInputChange}
                                    className=" block w-full border border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                >
                                    <option value={""}>Selected client</option>
                                    {dataClient.map((client, index) => (
                                        <option key={client.Id} value={client.Id}>{client.CompanyName}</option>
                                    ))}
                                </select>
                                {errors.ClientId && <p className="text-red-500 text-sm">{errors.ClientId}</p>}
                            </div>

                            {/* Service Type */}
                            <div className="mb-1 w-full">
                                <label className="block text-sm font-medium text-gray-700">Service Type</label>
                                <select
                                    name="ServiceTypeId"
                                    value={formData.ServiceTypeId}
                                    onChange={handleInputChange}
                                    className=" block w-full border border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                >
                                    <option value={""}>Selected Service Type</option>
                                    {dataService.map((service, index) => (
                                        <option key={service.Id} value={service.Id}>{service.TypeName} ({service.Initial})</option>
                                    ))}
                                </select>
                                {errors.ServiceTypeId && <p className="text-red-500 text-sm">{errors.ServiceTypeId}</p>}
                            </div>

                            <div className="mb-1 w-full">
                                <label className="block text-sm font-medium text-gray-700">Class Mode</label>
                                <select
                                    name="ClassMode"
                                    value={formData.ClassMode}
                                    onChange={handleInputChange}
                                    className=" block w-full border border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                >
                                    <option value="">Select Class Mode</option>
                                    <option value="Online">Online</option>
                                    <option value="Offline">Offline</option>
                                </select>
                                {errors.ClassMode && <p className="text-red-500 text-sm">{errors.ClassMode}</p>}
                            </div>

                            {/* Total Partisipant */}
                            <div className="mb-1 w-full">
                                <label className="block text-sm font-medium text-gray-700">Total Participant</label>
                                <input
                                    type="number"
                                    name="CountPartisipan"
                                    value={formData.CountPartisipan}
                                    onChange={handleInputChange}
                                    className=" block w-full border border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter total participants"
                                />
                                {errors.CountPartisipan && <p className="text-red-500 text-sm">{errors.CountPartisipan}</p>}
                            </div>

                            {/* Class Mode */}


                            {/* Address */}
                            <div className="mb-1 w-full">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleInputChange}
                                    className=" block w-full border border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter full address"
                                />
                                {errors.Address && <p className="text-red-500 text-sm">{errors.Address}</p>}
                            </div>

                            {/* Google Maps URL */}
                            <div className="mb-1 w-full">
                                <label className="block text-sm font-medium text-gray-700">Google Maps URL</label>
                                <input
                                    type="text"
                                    name="AddressUrl"
                                    value={formData.AddressUrl}
                                    onChange={handleInputChange}
                                    className=" block w-full border border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter Google Maps URL"
                                />
                                {errors.AddressUrl && <p className="text-red-500 text-sm">{errors.AddressUrl}</p>}
                            </div>

                            {/* Longitude */}
                            <div className="mb-1 w-full">
                                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                                <input
                                    type="text"
                                    name="longitude"
                                    value={formData.Longitude}
                                    readOnly
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm bg-gray-100"
                                    placeholder="Generated longitude"
                                />
                            </div>

                            {/* Latitude */}
                            <div className="mb-1 w-full">
                                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                                <input
                                    type="text"
                                    name="latitude"
                                    value={formData.Latitude}
                                    readOnly
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm bg-gray-100"
                                    placeholder="Generated latitude"
                                />
                            </div>

                            <div className="mb-1 w-full flex flex-col justify-start items-start">
                                <label className="text-sm font-medium text-gray-700">Mandays</label>
                                <DatePicker
                                    multiple
                                    value={dates}
                                    onChange={setDates}
                                    placeholder="Pilih tanggal"
                                    className='w-full'
                                    inputClass="border border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                                    containerClassName="custom-datepicker-container w-full"
                                />
                                {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col justify-start items-start mt-2">
                            {/* Title */}
                            <div className="mb-1 w-full">
                                <label className="text-sm font-medium text-gray-700">Title</label>
                                <input
                                    type="text"
                                    name="Title"
                                    value={formData.Title}
                                    onChange={handleInputChange}
                                    className=" w-full border border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter Title"
                                />
                                {errors.Title && <p className="text-red-500 text-sm">{errors.Title}</p>}
                            </div>


                            {/* Description */}
                            <div className="mb-1 w-full">
                                <label className="text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="Description"
                                    value={formData.Description}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter detailed Description"
                                    rows="4" // Set the number of rows for the textarea
                                ></textarea>
                                {errors.Description && <p className="text-red-500 text-sm">{errors.Description}</p>}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                                type="button"
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                onClick={() => setShowModal(false)} // Menutup modal
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-80 p-6 flex flex-col items-center justify-center space-y-4">
                        <AiOutlineCheckCircle className="text-green-500" size={50} />
                        <h3 className="text-xl font-bold">Success!</h3>
                        <p className="text-gray-700">User added successfully</p>
                    </div>
                </div>
            )}
            {apiError && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-80 p-6 flex flex-col items-center justify-center space-y-4">
                        <AiOutlineCheckCircle className="text-green-500" size={50} />
                        <h3 className="text-xl font-bold">Error!</h3>
                        <p className="text-gray-700">User added failed</p>
                    </div>
                </div>
            )}
        </div>
    );
}
