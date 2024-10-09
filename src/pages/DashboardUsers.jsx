import React, { useEffect, useState } from 'react'
import CurrentTasks from '../component/UserComponent/CurrentTasks'
import Activity from '../component/UserComponent/Activity'
import { AttendanceUsers } from '../Utils/ApiUsers';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import Loading from '../component/Loading';
import { serviceOrders } from '../Utils/apiManageClient';

export default function DashboardUsers() {
    const [loading, setLoading] = useState(false);
    const [attendanceTime, setAttendanceTime] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState('');
    const [idAttedance, setIdAttedance] = useState(0);
    const [successModal, setSuccessModal] = useState(false);
    const [listProject, setListProject] = useState([]);
    const [statusDone, setStatusDone] = useState(0);
    const [statusPending, setStatusPending] = useState(0);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (error) => {
                    setErrorMessage('Geolocation is not supported or permission denied');
                }
            );
        } else {
            setErrorMessage('Geolocation is not supported by this browser.');
        }

        fetchOrderId();
        fetchAttedance()
    }, []);

    const fetchOrderId = async () => {
        try {
            const response = await serviceOrders.getByConsultantId();
            setListProject(response.data)
            setStatusDone(response.statusCount.done)
            setStatusPending(response.statusCount.pending)
        } catch (error) {
            console.error("Failed to fetch service Order:", error);
        }
    }

    const fetchAttedance = async () => {
        try {
            const response = await AttendanceUsers.getAttendance();
            console.log(response.data[0].InDate)
            setAttendanceTime(response.data[0].OutDate !== null ? response.data[0].OutDate : response.data[0].InDate);
            setStatus(response.data[0].Status);
            setIdAttedance(response.Id);
        } catch (error) {
            console.error("Failed to fetch service Order:", error);
        }
    }

    const handleCheckIn = async () => {
        setLoading(true)
        const currentDate = new Date().toISOString();
        console.log(currentDate)
        try {
            const response = await AttendanceUsers.checkIn({
                Longitude: location.longitude,
                Latitude: location.latitude,
                InDate: currentDate,
            });

            setAttendanceTime(currentDate);
            setStatus(response.Status);
            setIdAttedance(response.Id);
            setSuccessModal(true);
            setTimeout(() => {
                setSuccessModal(false)

            }, 1000);
        } catch (error) {
            console.error('Error during check-in:', error);
        } finally {
            setLoading(false)
        }
    };

    const handleCheckOut = async () => {
        const currentDate = new Date().toISOString();
        setLoading(true)
        try {
            const response = await AttendanceUsers.checkOut(idAttedance);
            setAttendanceTime(currentDate);
            setStatus(response.Status);
            setIdAttedance(response.Id);
            setSuccessModal(true);
            setTimeout(() => {
                setSuccessModal(false)
            }, 1000);
        } catch (error) {
            console.error('Error during check-in:', error);
        } finally {
            setLoading(false)
        }
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div className='container'>
            <h1 className="text-xl font-bold mb-2">
                Dashboard
            </h1>

            {/* <div className="min-h-screen bg-gray-100 p-5"> */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Left side */}
                    <div className="md:col-span-2 space-y-5">
                        <div className="grid grid-cols-3 gap-10 w-full">

                            <div className="flex flex-col justify-start items-start bg-white px-2 py-3 rounded-lg shadow-md border border-slate-200 w-60">
                                <div className="flex flex-col items-start space-y-7 w-full">
                                    <h2 className="text-sm text-slate-400">Absence Status</h2>
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <p className="text-2xl">{attendanceTime
                                            ? new Date(attendanceTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                            : '--:--'}</p>
                                        {attendanceTime ? (
                                            <button onClick={handleCheckOut} className="bg-red-500 text-white p-2 rounded-md shadow-md text-xs">Check Out</button>
                                        ) : (
                                            <button onClick={handleCheckIn} className="bg-green-500 text-white p-2 rounded-md shadow-md text-xs">Check In</button>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-500">{status || '-'}</p>
                                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                                </div>
                            </div>



                            <div className="flex flex-col justify-start items-start bg-white px-2 py-3 rounded-lg shadow-md border border-slate-200 w-60">
                                <div className="flex flex-col items-start space-y-4 w-full">
                                    <h2 className="text-sm text-slate-400 ">Mandays</h2>
                                    <div className="flex flex-row justify-between items-center w-full">
                                        <div className="flex flex-col justify-center items-center gap-y-2 border-r-2 border-slate-300 w-1/2 ">
                                            <h1 className='text-xl font-semibold'>{statusDone}</h1>
                                            <p className="text-xs text-emerald-500 bg-emerald-50 rounded-md p-1 border border-emerald-500">Done</p>
                                        </div>
                                        <div className="flex flex-col justify-center items-center gap-y-2 w-1/2">
                                            <h1 className='text-xl font-semibold'>{statusPending}</h1>
                                            <p className="text-xs text-sky-500 bg-sky-50 rounded-md p-1 border border-sky-500">In Progress</p>
                                        </div>

                                    </div>
                                    <p className="text-sm text-gray-500">Last update 08 Sep 2024</p>
                                </div>
                            </div>
                        </div>
                        {/* Current Tasks Section */}
                        <div className="bg-white p-5 rounded-lg shadow">
                            <CurrentTasks data={listProject} />
                        </div>
                    </div>
                    {/* Right side */}
                    {/* <div className="space-y-5">
                        <div className="bg-white p-5 rounded-lg shadow">
                            <div className="flex items-center space-x-4">
                                <img
                                    src="https://randomuser.me/api/portraits/women/65.jpg"
                                    alt="User"
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h3 className="font-bold">Megan Norton</h3>
                                    <p className="text-gray-500">@megannorton</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-lg shadow">
                            <Activity />
                        </div>
                    </div> */}
                </div>
            </div>
            {successModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-80 p-6 flex flex-col items-center justify-center space-y-4">
                        <AiOutlineCheckCircle className="text-green-500" size={50} />
                        <h3 className="text-xl font-bold">Success!</h3>
                        <p className="text-gray-700">Success Check In</p>
                    </div>
                </div>
            )}
            {/* {showErrorModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-80 p-6 flex flex-col items-center justify-center space-y-4">
                        <AiOutlineCloseCircle className="text-red-500" size={50} />
                        <h3 className="text-xl font-bold">Error!</h3>
                        <p className="text-gray-700 text-center">{message}</p>
                    </div>
                </div>
            )} */}
        </div>
    )
}
