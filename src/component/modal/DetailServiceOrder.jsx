import React, { useEffect, useState } from 'react'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import Loading from '../Loading';
import { useNavigate } from 'react-router-dom';
import { serviceOrders } from '../../Utils/apiManageClient';

export default function DetailServiceOrder({ showModalDetail, setShowModalDetail, serviceId }) {
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataService, setDataService] = useState([]);
    const navigate = useNavigate();

    console.log(serviceId)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await serviceOrders.getById(serviceId);
                console.log(response)
                setDataService(response);
            } catch (error) {
                console.log(error)
            }
        }

        fetchdata();
    }, [serviceId])


    if (!showModalDetail) return null;

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                {loading ? (
                    <Loading />
                ) : (

                    <div className="bg-white rounded-lg w-[70%] p-6 relative max-h-[90vh] overflow-auto">
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col justify-start items-start mb-5">
                                <h2 className="text-lg font-semibold">{dataService?.OrderId}</h2>
                                <h2 className="text-lg text-slate-400">{dataService?.CountPartisipan} Partisipan</h2>
                            </div>
                            <div className={`p-2 text-center rounded-lg ${dataService.Status === 'Created' ? 'bg-gray-200 text-gray-700' :
                                dataService.Status === 'Release' ? 'bg-yellow-200 text-yellow-700' :
                                    dataService.Status === 'Execute' ? 'bg-blue-200 text-blue-700' :
                                        dataService.Status === 'Invoiced' ? 'bg-purple-200 text-purple-700' :
                                            dataService.Status === 'Paid' ? 'bg-green-200 text-green-700' :
                                                dataService.Status === 'Completed' ? 'bg-green-500 text-white' :
                                                    dataService.Status === 'Canceled' ? 'bg-red-200 text-red-700' : 'bg-gray-100'
                                }`}>
                                {dataService.Status}
                            </div>
                        </div>
                        <div className="border-b border-slate-300 my-3"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col justify-start items-start">
                                <label className='text-slate-400'>Company Name</label>
                                <h1>{dataService?.Client?.CompanyName}</h1>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label className='text-slate-400'>Company Email</label>
                                <h1>{dataService?.Client?.Email}</h1>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label className='text-slate-400'>Class Mode</label>
                                <h1>{dataService?.ClassMode}</h1>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label className='text-slate-400'>Service</label>
                                <h1>{dataService?.ServiceType}</h1>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label className='text-slate-400'>Address</label>
                                <h1>{dataService?.Address}</h1>
                            </div>
                            <div className="flex flex-col justify-start items-start">
                                <label className='text-slate-400'>Total Mandays</label>
                                <h1>{dataService?.Consultants?.length} Mandays</h1>
                            </div>
                        </div>

                        <div className="border-b border-slate-400 my-5"></div>

                        <h1 className='text-sm font-semibold'>Detail Mandays</h1>

                        <table className='table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer'>
                            <thead>
                                <tr>
                                    <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300'>#</th>
                                    <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300'>Consultan Name</th>
                                    <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300'>Date</th>
                                    <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataService?.Consultants?.map((items, index) => (
                                    <tr key={index}>
                                        <td className='py-3 px-3'>{index + 1}</td>
                                        <td className='py-3 px-3'>{items.ConsultanUser ?? "-"}</td>
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
                                onClick={() => setShowModalDetail(false)}
                            >
                                Cancel
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
        </>
    )
}
