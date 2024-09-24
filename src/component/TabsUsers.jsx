import React, { useEffect, useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { LiaUserEditSolid } from "react-icons/lia";
import { HiTrash } from "react-icons/hi2";
import AddModalUsers from "./modal/AddModalUsers";
import { Users } from "../Utils/ApiUsers";
import debounce from "lodash.debounce";
import { AiOutlineCheckCircle, AiOutlineExclamationCircle } from "react-icons/ai";
import EditModalUsers from "./modal/EditModalUsers";
import Loading from "./Loading";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const TabUsers = () => {
    const [activeTab, setActiveTab] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(5);
    const [showModal, setShowModal] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [userToDelete, setUserToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState(null);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const fetchUsers = async () => {
        try {
            const response = await Users.getUsers(currentPage, resultsPerPage, filterRole, searchTerm.trim(),);

            setAllUsers(response.data);
            setTotalResults(response.totalResults);
            setTotalPages(response.totalPages);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, [currentPage, filterRole, searchTerm, resultsPerPage]);

    // Debounce untuk search input agar tidak terlalu cepat memanggil API
    const handleSearchChange = debounce((value) => {
        setSearchTerm(value);
        setCurrentPage(1); // Reset halaman ke 1 setiap kali ada pencarian baru
    }, 500);

    const handleTabChange = (selectedRole) => {
        const isAllRole = selectedRole === "all";
        const newFilterRole = isAllRole ? "" : selectedRole;
        setActiveTab(selectedRole);
        setFilterRole(newFilterRole);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };


    const renderUserTable = (usersData) => {
        const users = usersData.map((userData, index) => ({
            id: userData.Id,
            name: userData.UserDetail.Name,
            role: userData.Role,
            email: userData.Email,
            isActive: userData.IsActive,
            data: userData,
        }));

        return (
            <table className="min-w-full table-auto text-sm">
                <thead className="bg-white">
                    <tr className="border-b border-slate-500 rounded-2xl bg-gray-100">
                        <th className="text-start px-4 py-2">#</th>
                        <th className="text-start px-4 py-2">Name</th>
                        <th className="text-start px-4 py-2">Role</th>
                        <th className="text-start px-4 py-2">Email</th>
                        <th className="text-start px-4 py-2">Status</th>
                        <th className="text-start px-4 py-2"></th>
                    </tr>
                </thead>
                <tbody>

                    {users.map((user, index) => (
                        <tr key={user.id} className="bg-white">
                            <td className="border-b border-gray-300 px-4 py-2">{index + 1}</td>
                            <td className="border-b border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border-b border-gray-300 px-4 py-2">{user.role}</td>
                            <td className="border-b border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border-b border-gray-300 px-4 py-2 m-auto">
                                <div
                                    className={`rounded-full w-20 py-1 px-3 text-xs text-center ${user.isActive ? "bg-emerald-100 text-emerald-500" : "bg-red-100 text-red-500"}`}
                                >
                                    {user.isActive ? "Active" : "Inactive"}
                                </div>
                            </td>
                            <td className="border-b border-gray-300 px-4 py-2">
                                <div className="flex justify-center items-center space-x-2">
                                    <LiaUserEditSolid
                                        size={20}
                                        className="text-sky-400 hover:text-sky-600 cursor-pointer"
                                        onClick={() => handleEditUser(user.data)}
                                    />
                                    <div className="border-l border-slate-300 h-5"></div>
                                    <HiTrash
                                        size={20}
                                        className="text-red-400 hover:text-red-600 cursor-pointer"
                                        onClick={() => confirmDeleteUser(user)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const confirmDeleteUser = (user) => {
        setUserToDelete(user); // Simpan data user untuk dihapus
    };

    const handleDeleteUser = async () => {
        setLoading(true);
        try {
            await Users.deleteUsers(userToDelete.id);
            setUserToDelete(null);
            setAllUsers(allUsers.filter((user) => user.id !== userToDelete.id));

            setTimeout(() => {
                setLoading(false);  // Sembunyikan loading setelah submit selesai
                setShowSuccessModal(true);  // Tampilkan modal success
                setTimeout(() => {
                    setShowSuccessModal(false);
                    setShowModal(false);  // Tutup modal setelah sukses
                }, 3000); // Durasi tampil modal success
            }, 2000);
            setCurrentPage(1);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditUser = (user) => {
        setUserToEdit(user);
        setShowModalEdit(true);
        fetchUsers();
    };

    if (loading) {
        return <Loading />
    }

    return (
        <div className="container mx-auto py-2 relative">
            {/* Tabs */}
            <div className="flex justify-between mb-4 text-sm">
                <div className="flex space-x-4 border-b border-slate-300 w-full">
                    <button
                        className={`px-4 py-2 ${activeTab === "all" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
                        onClick={() => handleTabChange("all")}
                    >
                        All Users
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === "Marketing" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
                        onClick={() => handleTabChange("Marketing")}
                    >
                        Marketing
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === "Admin" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
                        onClick={() => handleTabChange("Admin")}
                    >
                        Admin
                    </button>
                    <button
                        className={`px-4 py-2 ${activeTab === "Consultant" ? "border-b-2 border-blue-500 text-blue-500" : ""}`}
                        onClick={() => handleTabChange("Consultant")}
                    >
                        Consultants
                    </button>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="flex justify-between mb-4 text-sm">
                {/* Search Bar */}
                <div className="relative">
                    <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
                    <input
                        type="search"
                        placeholder="Search by name..."
                        onChange={(e) => handleSearchChange(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                {/* Add User Button */}
                <button
                    className="border border-blue-300 text-blue-500 px-4 py-2 flex items-center space-x-2 rounded-md hover:bg-blue-100"
                    onClick={() => setShowModal(true)}
                >
                    <FiPlus />
                    <span>Add User</span>
                </button>
            </div>

            {/* Table */}
            <div>
                {renderUserTable(allUsers)}
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4 text-sm">
                <span>
                    Showing {currentPage} to {resultsPerPage} of {totalResults} entries
                </span>

                <div className="flex flex-row justify-end items-center space-x-2">
                    <div className="flex flex-row justify-center items-center space-x-2">
                        <p className="text-xs ">Per page</p>
                        <select
                            value={resultsPerPage}
                            onChange={(e) => setResultsPerPage(Number(e.target.value))}
                            className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            className={`px-3 py-1 border rounded-md  ${currentPage === 1 ? 'text-gray-500 bg-gray-100' : 'text-blue-500 bg-white'} `}
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            <FaArrowLeftLong />
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            className={`px-3 py-1 border rounded-md  ${currentPage === totalPages ? 'text-gray-500 bg-gray-100' : 'text-blue-500 bg-white'} `}
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            <FaArrowRightLong />
                        </button>
                    </div>
                </div>
            </div>

            {userToDelete && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 space-y-4 w-96">
                        <AiOutlineExclamationCircle size={50} className="text-red-500 mx-auto" />
                        <h2 className="text-lg font-bold text-center">Confirm Delete</h2>
                        <p className="text-center">Are you sure you want to delete <strong>{userToDelete.name}</strong>?</p>
                        <div className="flex justify-between items-center space-x-2">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-md w-1/2"
                                onClick={() => setUserToDelete(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md w-1/2"
                                onClick={handleDeleteUser}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Overlay */}
            {showModal && (
                <AddModalUsers showModal={showModal} setShowModal={setShowModal} />
            )}

            {showModalEdit && (
                <EditModalUsers showModal={showModalEdit} setShowModal={setShowModalEdit} userToEdit={userToEdit} />
            )}

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-80 p-6 flex flex-col items-center justify-center space-y-4">
                        <AiOutlineCheckCircle className="text-green-500" size={50} />
                        <h3 className="text-xl font-bold">Success!</h3>
                        <p className="text-gray-700">User deleted successfully</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TabUsers;
