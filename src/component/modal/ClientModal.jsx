import React, { useEffect, useState } from 'react';
import { clientData } from '../../Utils/apiManageClient';
import Loading from '../Loading';

export default function ClientModal({ isOpen, onClose, onSave, client }) {
    const initialFormData = client || {
        CompanyName: '',
        Initial: '',
        Email: '',
        PhoneNumber: '',
        Latitude: '',
        Longitude: '',
        IsActive: true,
        AddressUrl: '',
        Address: '', // Menambahkan ini
    };

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (client) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...client,
            }));
        }
    }, [client]);

    const parseGoogleMapsUrl = (url) => {
        try {
            const atIndex = url.indexOf('@');
            if (atIndex !== -1) {
                const subStr = url.substring(atIndex + 1);
                const parts = subStr.split(/[ ,\/]/);
                if (parts.length >= 2) {
                    const Latitude = parts[0];
                    const Longitude = parts[1];
                    return { Latitude, Longitude };
                }
            }
            // Alternatif untuk format URL yang berbeda
            const latMatch = url.match(/!3d([-0-9.]+)/);
            const lngMatch = url.match(/!4d([-0-9.]+)/);
            if (latMatch && lngMatch) {
                const Latitude = latMatch[1];
                const Longitude = lngMatch[1];
                return { Latitude, Longitude };
            }
        } catch (error) {
            console.error('Error parsing Google Maps URL:', error);
        }
        return { Latitude: '', Longitude: '' };
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'AddressUrl') {
            const { Latitude, Longitude } = parseGoogleMapsUrl(value);
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
                Latitude: Latitude,
                Longitude: Longitude,
            }));
        } else if (name === 'CompanyName') {
            const initials = getInitials(value);
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
                Initial: initials,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            let response;
            if (!client) {
                response = await clientData.create(formData);
                setSuccessMessage(response.message);
            } else {
                response = await clientData.updateClient(client.Id, formData);
                setSuccessMessage(response.message);
            }

            if (response && response.success === true) {
                // Tampilkan pesan sukses atau lakukan tindakan lain
                setIsSuccessModalOpen(true);

                // Menunda eksekusi onSave dan onClose selama 2 detik (2000 ms)
                setTimeout(async () => {
                    await onSave();
                    onClose(); // Tutup modal setelah berhasil
                }, 2000);
            } else {
                setErrorMessage(response.message || 'An error occurred');
            }
        } catch (error) {
            setErrorMessage(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };


    const closeModal = () => {
        setFormData(initialFormData === "");
        onClose();
    };

    if (!isOpen && !isSuccessModalOpen) return null;

    const closeSuccessModal = () => {
        setIsSuccessModalOpen(false);
        closeModal();
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            {/* Main Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
                    <div className="mb-4">
                        {client ? (
                            <div className="flex items-center">
                                {client.image ? (
                                    <img
                                        src={client.image}
                                        alt={client.CompanyName}
                                        className="w-16 h-16 rounded-full"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-gray-500 flex items-center justify-center text-white text-2xl">
                                        {getInitials(client.CompanyName)}
                                    </div>
                                )}
                                <div className="ml-4">
                                    <h2 className="text-xl font-semibold mb-1">{client.CompanyName}</h2>
                                    <p className="text-gray-500">{client.code}</p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-xl font-semibold mb-1">Add Client</h2>
                            </div>
                        )}
                    </div>
                    <div className="space-y-4">
                        {/* Fields */}
                        <div className="flex justify-between gap-2">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    name="CompanyName"
                                    value={formData.CompanyName}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                    required
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Initial</label>
                                <input
                                    type="text"
                                    name="Initial"
                                    value={formData.Initial}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full bg-gray-100"
                                    required
                                    readOnly
                                />
                            </div>
                        </div>
                        {/* More Fields */}
                        <div className="flex justify-between gap-2">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="text"
                                    name="PhoneNumber"
                                    value={formData.PhoneNumber}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                />
                            </div>
                        </div>
                        {/* Address Field */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <textarea
                                name="Address"
                                value={formData.Address}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                                rows="3"
                            ></textarea>
                        </div>
                        {/* Address URL Field */}
                        <div className="w-full">
                            <label className="block text-sm font-medium text-gray-700">Address URL</label>
                            <input
                                type="text"
                                name="AddressUrl"
                                value={formData.AddressUrl}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                            />
                            <p className="text-sm text-gray-500 mt-1">
                                Masukkan URL Google Maps, longitude dan latitude akan terisi otomatis.
                            </p>
                        </div>
                        {/* Longitude and Latitude Fields */}
                        <div className="flex justify-between gap-2">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                                <input
                                    type="text"
                                    name="Longitude"
                                    value={formData.Longitude}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full bg-gray-100"
                                    readOnly
                                />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                                <input
                                    type="text"
                                    name="Latitude"
                                    value={formData.Latitude}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full bg-gray-100"
                                    readOnly
                                />
                            </div>
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
                        <p className="text-gray-700 mb-4">{successMessage}</p>
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
