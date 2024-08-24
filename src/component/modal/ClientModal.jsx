import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { getUserById } from '../../Utils/ApiUsers';

export default function ClientModal({ isOpen, onClose, onSave, client }) {
    const initialFormData = client || {
        name: '',
        email: '',
        contact_person: '',
        contact_title: '',
        contact_phone: '',
        longitude: '',
        latitude: '',
        status: 1,
        updatedBy: '',
        createdBy: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [idUsers, setIdUsers] = useState('');

    useEffect(() => {
        const token = Cookies.get('refreshToken');
        if (token) {
            const decodedToken = jwtDecode(token);
            const nameFromToken = decodedToken.name;
            
            const response = getUserById.getById(decodedToken.Id);
            console.log("data",response);
            // const name = response.data.user.name;
            // if (client) {
            //     setFormData(prevFormData => ({
            //         ...prevFormData,
            //         ...client,
            //         updatedBy: name,
            //     }));
            // } else {
            //     console.log(response);
            //     setFormData(prevFormData => ({
            //         ...prevFormData,
            //         createdBy: name, // Tetapkan createdBy dari token saat menambahkan data
            //     }));
            // }
        }
    }, [client]);

    const resetForm = () => {
        setFormData(initialFormData);
    };

    const handleStatusChange = () => {
        setFormData(prevFormData => {
            const newStatus = prevFormData.status === 1 ? 2 : 1;
            return {
                ...prevFormData,
                status: newStatus,
            };
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async () => {
        setLoading(true);
        console.log(formData);
        try {
            if (client) {
                await onSave(formData);
                resetForm(); // reset form after successful save
                setIsSuccessModalOpen(true);
            } else {
                const response = await onSave(formData);
                if (response.statusCode === 200) {
                    resetForm(); // reset form after successful save
                    setIsSuccessModalOpen(true);
                } else {
                    setErrorMessage(response.message); // Simpan pesan error
                    setIsErrorModalOpen(true); // Tampilkan modal error
                }
            }
        } catch (error) {
            // Jika error tidak sesuai format atau dari catch block
            setErrorMessage(error.message || 'Something went wrong'); // Simpan pesan error
            setIsErrorModalOpen(true); // Tampilkan modal error
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        resetForm();
        onClose();
    };

    if (!isOpen && !isSuccessModalOpen) return null;

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('');
    };

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        closeModal();
    };

    return (
        <div>
            {/* Main Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                    <div className="flex items-center mb-4">
                        {client?.image ? (
                            <img
                                src={client.image}
                                alt={client.name}
                                className="w-16 h-16 rounded-full"
                            />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center text-white text-2xl">
                                {getInitials(client?.name || formData.name)}
                            </div>
                        )}
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold mb-1">{client ? client.name : 'Add Client'}</h2>
                            <p className="text-gray-500">{client ? client.code : ''}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {/* Fields */}
                        <div className="flex justify-between gap-2">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Name Client</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Contact Person</label>
                                <input
                                    type="text"
                                    name="contact_person"
                                    value={formData.contact_person}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                />
                            </div>
                        </div>
                        {/* More Fields */}
                        {/* Add more input fields similar to the above */}
                        <div className="flex justify-between gap-2">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="contact_phone"
                                    value={formData.contact_phone}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between gap-2">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                                <input
                                    type="text"
                                    name="longitude"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                                <input
                                    type="text"
                                    name="latitude"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                />
                            </div>
                        </div>

                        {/* Status Toggle */}
                        <div className="flex justify-between gap-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Status</label>
                                <div
                                    onClick={handleStatusChange}
                                    className={`w-20 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer ${formData.status === 1 ? 'justify-start' : 'justify-end'
                                        }`}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full ${formData.status === 1 ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                    ></div>
                                </div>
                                <span className="text-sm text-gray-600 mt-1 block">
                                    {formData.status === 1 ? 'Aktif' : 'Nonaktif'}
                                </span>
                            </div>
                            {client ? "" : (
                                <div className="w-1/2">
                                    <label className="block text-sm font-medium text-gray-700">Contact title</label>
                                    <input
                                        type="text"
                                        name="contact_title"
                                        value={formData.contact_title}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between mt-6 gap-2">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-red-300 rounded-md w-1/2"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md w-1/2"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
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

            {/* Error Modal */}
            {isErrorModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                        <h2 className="text-xl font-semibold mb-4">Error</h2>
                        <p className="text-gray-700 mb-4">{errorMessage}</p>
                        <button
                            onClick={() => setIsErrorModalOpen(false)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md w-full"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
