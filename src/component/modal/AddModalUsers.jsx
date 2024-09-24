import React, { useState, useEffect } from 'react';
import { Users } from '../../Utils/ApiUsers';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Loading from '../Loading'; // Komponen loading

// Function to generate initials from the full name
const generateInitial = (name) => {
    if (!name) return '';
    const nameParts = name.split(" ");
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join("");
    return initials;
};

// Function to extract Longitude and Latitude from Google Maps URL
const extractLongLatFromUrl = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/; // Regex to extract the lat and long
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

export default function AddModalUsers({ showModal, setShowModal }) {
    const [formData, setFormData] = useState({
        UserName: "",
        Initial: "",
        Email: "",
        Password: "",
        Role: "Consultant", // Default role
        Name: "",
        Address: "",
        AddressUrl: "", // Input URL for address
        PhoneNumber: "",
        Longitude: "",
        Latitude: "",
        CreatedBy: "system"
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false); // State untuk loading spinner

    // Validasi form sebelum submit
    const validateForm = () => {
        const newErrors = {};
        if (!formData.UserName.trim()) newErrors.UserName = "UserName is required";
        if (!formData.Name.trim()) newErrors.Name = "Name is required";
        if (!formData.Address.trim()) newErrors.Address = "Address is required";
        if (!formData.AddressUrl.trim()) newErrors.AddressUrl = "AddressUrl is required";
        if (!formData.PhoneNumber.trim()) newErrors.PhoneNumber = "Phone Number is required";
        if (!formData.Email.trim()) {
            newErrors.Email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.Email)) {
            newErrors.Email = "Email is invalid";
        }
        if (!formData.Password.trim()) {
            newErrors.Password = "Password is required";
        } else if (formData.Password.length < 6) {
            newErrors.Password = "Password must be at least 6 characters";
        }
        return newErrors;
    };

    // Auto-generate Initial berdasarkan Name
    useEffect(() => {
        const initial = generateInitial(formData.Name);
        setFormData((prevData) => ({ ...prevData, Initial: initial }));
    }, [formData.Name]);

    // Auto-extract Longitude and Latitude dari Address URL
    useEffect(() => {
        const { longitude, latitude } = extractLongLatFromUrl(formData.AddressUrl);
        setFormData((prevData) => ({
            ...prevData,
            Longitude: longitude,
            Latitude: latitude
        }));
    }, [formData.AddressUrl]);

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

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        setLoading(true);

        try {
            await Users.addUsers(formData);
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
                <div className="bg-white rounded-lg w-[40rem] p-6 relative">
                    <h2 className="text-xl font-bold">Add New User</h2>
                    <div className='border-b border-slate-400 w-full my-4'></div>
                    <form onSubmit={handleFormSubmit}>

                        <div className="grid grid-cols-2 gap-4">
                            {/* Name */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleInputChange}
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter full name"
                                />
                                {errors.Name && <p className="text-red-500 text-sm">{errors.Name}</p>}
                            </div>

                            {/* Initial */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Initial</label>
                                <input
                                    type="text"
                                    name="Initial"
                                    value={formData.Initial}
                                    readOnly
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm bg-gray-100"
                                    placeholder="Generated initial"
                                />
                            </div>

                            {/* Username */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="UserName"
                                    value={formData.UserName}
                                    onChange={handleInputChange}
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter username"
                                />
                                {errors.UserName && <p className="text-red-500 text-sm">{errors.UserName}</p>}
                            </div>

                            {/* Email */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleInputChange}
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter email"
                                />
                                {errors.Email && <p className="text-red-500 text-sm">{errors.Email}</p>}
                            </div>

                            {/* Password */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="Password"
                                    value={formData.Password}
                                    onChange={handleInputChange}
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter password"
                                />
                                {errors.Password && <p className="text-red-500 text-sm">{errors.Password}</p>}
                            </div>

                            {/* Role */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    name="Role"
                                    value={formData.Role}
                                    onChange={handleInputChange}
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                >
                                    <option value="Consultant">Consultant</option>
                                    <option value="Admin">Admin</option>
                                    <option value="Marketing">Marketing</option>
                                </select>
                            </div>

                            {/* Address */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    name="Address"
                                    value={formData.Address}
                                    onChange={handleInputChange}
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter full address"
                                />
                                {errors.Address && <p className="text-red-500 text-sm">{errors.Address}</p>}
                            </div>

                            {/* Phone Number */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="PhoneNumber"
                                    value={formData.PhoneNumber}
                                    onChange={handleInputChange}
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter phone number"
                                />
                                {errors.PhoneNumber && <p className="text-red-500 text-sm">{errors.PhoneNumber}</p>}
                            </div>

                            {/* Google Maps URL */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Google Maps URL</label>
                                <input
                                    type="text"
                                    name="AddressUrl"
                                    value={formData.AddressUrl}
                                    onChange={handleInputChange}
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                                    placeholder="Enter Google Maps URL"
                                />
                                {errors.AddressUrl && <p className="text-red-500 text-sm">{errors.AddressUrl}</p>}
                            </div>

                            {/* Longitude */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                                <input
                                    type="text"
                                    name="Longitude"
                                    value={formData.Longitude}
                                    readOnly
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm bg-gray-100"
                                    placeholder="Generated longitude"
                                />
                            </div>

                            {/* Latitude */}
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                                <input
                                    type="text"
                                    name="Latitude"
                                    value={formData.Latitude}
                                    readOnly
                                    className=" block w-full border-gray-300 rounded-md px-2 py-2 shadow-sm bg-gray-100"
                                    placeholder="Generated latitude"
                                />
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
