import React, { useState, useEffect } from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import Loading from '../Loading'; // Komponen loading
import { clientData, serviceOrders, serviceType } from '../../Utils/apiManageClient';
import { Users } from '../../Utils/ApiUsers';

export default function AddConsultan({ showModalRelease, setShowModalRelease, serviceId }) {
    const [apiError, setApiError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorsModal] = useState(false);
    const [message, setMessage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataService, setDataService] = useState([]);
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const [role, setRole] = useState("Consultant");
    const [search, setSearch] = useState("");
    const [listConsultant, setListConsultan] = useState([]);

    // Fetch data for service order and consultants
    useEffect(() => {
        const getConsultant = async () => {
            try {
                const response = await Users.getUsers(page, limit, role, search);
                setListConsultan(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchdata();
        getConsultant();
    }, [serviceId, page, limit, role, search]);

    const fetchdata = async () => {
        try {
            const response = await serviceOrders.getByOrderId(serviceId);
            console.log(response)
            setDataService(response);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle consultant change
    const handleConsultantChange = async (consultantId, itemId) => {
        try {
            setLoading(true);
            const formData = {
                ConsultantId: consultantId,
            };

            await serviceOrders.updateDataConsultant(itemId, formData);
            setMessage("Add consultant successfully")
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
                setMessage('');
            }, 1000);
            fetchdata();
        } catch (error) {

            setMessage('Failed to update consultant');
            setShowErrorsModal(true)
            setTimeout(() => {
                setShowErrorsModal(false);
            }, 1000);
        } finally {
            setLoading(false);
        }
    };

    // Handle release service order
    const handleRelease = async () => {
        try {
            setLoading(true);

            // Check if all consultants have been selected
            const allConsultantsSelected = dataService.data.every(item => !!item.ConsultantId);

            if (!allConsultantsSelected) {
                setMessage('All consultants must be selected before releasing the order.');
                setShowErrorsModal(true)
                setTimeout(() => {
                    setShowErrorsModal(false);
                }, 1000);
                return; // Stop the process if not all consultants are selected
            }

            // Proceed with updating status to "Release"
            const formDataServiceOrder = {
                Status: "Release",
            };

            const updatedData = await serviceOrders.updateServiceOrder(serviceId, formDataServiceOrder);
            setDataService(updatedData);
            setMessage("Service order update successfully")
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
                setShowModalRelease(false);
                setMessage('');
            }, 1000);
            fetchdata();
        } catch (error) {
            setMessage('Failed to release service order');
            setShowErrorsModal(true)
            setTimeout(() => {
                setShowErrorsModal(false);
                setMessage('');
            }, 1000);
        } finally {
            setLoading(false);
        }
    };

    if (!showModalRelease) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            {loading ? (
                <Loading />
            ) : (
                <div className="bg-white rounded-lg w-[70%] p-6 relative">
                    <h2 className="text-xl font-bold">Assign Consultant</h2>
                    <div className='border-b border-slate-400 w-full my-4'></div>
                    <table className='table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer'>
                        <thead>
                            <tr>
                                <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300'>#</th>
                                <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300'>Consultant Name</th>
                                <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300'>Date</th>
                                <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300'>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataService?.data?.map((items, index) => (
                                <tr key={index}>
                                    <td className='py-3 px-3'>{index + 1}</td>
                                    <td className='py-3 px-3'>
                                        <select
                                            className='w-full p-1 rounded-md'
                                            value={items.ConsultantId || ""} // Menggunakan ConsultantId sebagai value
                                            onChange={(e) => handleConsultantChange(e.target.value, items.Id)} // Memperbarui konsultan jika ada perubahan
                                        >
                                            <option value="">Select Consultant</option>
                                            {/* Looping untuk list consultant */}
                                            {listConsultant.map((data, index) => (
                                                <option key={index} value={data.Id}>
                                                    {data.UserName}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className='py-3 px-3'>{items.Date}</td>
                                    <td className='py-3 px-3'>{items.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="border-b border-slate-400 my-5"></div>

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 bg-red-300 rounded-md hover:bg-red-400"
                            onClick={() => setShowModalRelease(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-emerald-300 rounded-md hover:bg-emerald-400"
                            onClick={handleRelease} // Now using handleRelease function for the button
                        >
                            Release
                        </button>
                    </div>
                </div>
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-80 p-6 flex flex-col items-center justify-center space-y-4">
                        <AiOutlineCheckCircle className="text-green-500" size={50} />
                        <h3 className="text-xl font-bold">Success!</h3>
                        <p className="text-gray-700">{message}</p>
                    </div>
                </div>
            )}
            {showErrorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-80 p-6 flex flex-col items-center justify-center space-y-4">
                        <AiOutlineCloseCircle className="text-red-500" size={50} />
                        <h3 className="text-xl font-bold">Error!</h3>
                        <p className="text-gray-700 text-center">{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
