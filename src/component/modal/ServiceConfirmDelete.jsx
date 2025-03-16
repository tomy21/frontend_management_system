import React from 'react';

export default function ConfirmDeleteModal({ isOpen, onClose, onDelete, service }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                <p>Are you sure you want to delete this service type?</p>
                <p className="mt-2 font-semibold">{service.TypeName}</p>
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onDelete(service.Id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
