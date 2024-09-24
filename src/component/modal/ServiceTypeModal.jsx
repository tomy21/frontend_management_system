import React, { useState, useEffect } from 'react';

export default function ServiceTypeModal({ isOpen, onClose, onSave, service }) {
    const [formData, setFormData] = useState({
        TypeName: '',
        Initial: '',
        Description: '',
    });

    useEffect(() => {
        if (service) {
            setFormData({
                TypeName: service.TypeName || '',
                Initial: service.Initial || '',
                Description: service.Description || '',
            });
        } else {
            setFormData({
                TypeName: '',
                Initial: '',
                Description: '',
            });
        }
    }, [service]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Jika nama field adalah TypeName, otomatis isi Initial
        if (name === 'TypeName') {
            setFormData({
                ...formData,
                [name]: value,
                Initial: value
                    .split(' ')
                    .map((word) => word[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase(),
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-xl font-semibold mb-4">
                    {service ? 'Edit Service Type' : 'Add Service Type'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* TypeName */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Service Type Name
                        </label>
                        <input
                            type="text"
                            name="TypeName"
                            value={formData.TypeName}
                            onChange={handleChange}
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                        />
                    </div>
                    {/* Initial */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Initial
                        </label>
                        <input
                            type="text"
                            name="Initial"
                            value={formData.Initial}
                            onChange={handleChange}
                            readOnly
                            required
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full bg-gray-100"
                        />
                    </div>
                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="Description"
                            value={formData.Description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-2 mt-1 w-full"
                            rows={3}
                        ></textarea>
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            {service ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
