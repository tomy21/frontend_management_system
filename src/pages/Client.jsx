import React, { useEffect, useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { LuClipboardEdit, LuFilter } from 'react-icons/lu';
import { MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md';
import { clientData } from '../Utils/apiManageClient';
import { format } from 'date-fns';
import ClientModal from '../component/modal/ClientModal'; // Import ClientModal component
import ConfirmModal from '../component/modal/ClientConfirmationDelete'; // Import ConfirmModal component
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';

export default function Client() {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalItems, setTotalItems] = useState(5); // Default 10 items per page
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("0");
  const [totalResult, setTotalResult] = useState(0);

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null); // Client data for edit

  const fetchData = async () => {
    try {
      const response = await clientData.getAll(currentPage, totalItems, search);
      setTotalResult(response.totalClients);
      setData(response.data);
      setTotalPage(response.totalPages);
      setActive(response.totalActiveClients);
      setInactive(response.totalInactiveClients);
      setLastUpdate(response.lastUpdatedAt);
    } catch (error) {
      console.error("Failed to fetch clients:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, totalItems, search]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleAddClient = () => {
    setSelectedClient(null); // Reset selected client for add
    setIsClientModalOpen(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setIsClientModalOpen(true);
  };

  const handleDeleteClient = (client) => {
    setSelectedClient(client); // Set selected client for delete
    setIsConfirmModalOpen(true);
  };

  const handleSaveClient = async () => {
    await fetchData();
    setIsClientModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await clientData.deleteClient(selectedClient.Id);
      setIsConfirmModalOpen(false);
      fetchData(); // Reload data setelah delete
    } catch (error) {
      console.error("Failed to delete client:", error);
    }
  };

  return (
    <div className='w-full'>
      <h1 className="text-xl font-semibold mb-2">
        Client
      </h1>

      {/* Total Clients Information */}
      <div className="flex flex-row w-[25%] justify-center items-center px-5 py-3 rounded-md">
        <div className="flex flex-col w-full space-y-5">
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-y-2">
              <h1 className='text-lg font-semibold'>{active} <span className='text-xs font-medium text-slate-500'>Clients</span></h1>
              <div className="flex flex-row justify-start items-center gap-x-2">
                <div className='w-2 h-2 bg-cyan-600 rounded-full'></div>
                <div className="text-xs text-success font-medium">Active</div>
              </div>
            </div>

            <div className="flex flex-col gap-y-2 border-l pl-10 border-slate-300">
              <h1 className='text-lg font-semibold'>{inactive} <span className='text-xs font-medium text-slate-500'>Clients</span></h1>
              <div className="flex flex-row justify-start items-center gap-x-2">
                <div className='w-2 h-2 bg-red-600 rounded-full'></div>
                <div className="text-xs text-success font-medium">Non Active</div>
              </div>
            </div>

          </div>
          <div className="text-xs text-sky-500">Last update <span className='font-semibold '>{format(new Date(lastUpdate), "dd MMMM yyyy")}</span></div>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex justify-between items-center mt-7">
        <input
          type="search"
          name="search"
          id="search"
          className='border border-slate-300 rounded-md px-2 py-3 text-xs w-72'
          placeholder='Search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-row space-x-3 justify-center items-center">
          <button
            onClick={handleAddClient}
            className='flex flex-row space-x-2 text-sm text-sky-500 border-slate-400 justify-center items-center'
          >
            <IoIosAddCircleOutline />
            <p>Add Client</p>
          </button>
          <button className='flex flex-row space-x-2 text-sm text-emerald-500 px-5 border-r border-slate-400 justify-center items-center'>
            <AiOutlineCloudDownload />
            <p>Export</p>
          </button>
          <button className='flex flex-row space-x-2 text-sm text-emerald-500 border-slate-400 justify-center items-center'>
            <LuFilter />
            <p>Filter</p>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto max-h-[56vh] w-full mt-2 ">
        <table className='table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer'>
          <thead className='border border-slate-200'>
            <tr>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[5%]'>#</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[20%]'>Profile</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[20%]'>Contact</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[15%]'>Join Date</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 text-center w-[10%]'>Status</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[10%]'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((client, index) => (
              <tr key={index}>
                <td className='py-3 px-3'>{index + 1}</td>
                <td className='py-3 px-3'>
                  <div className="flex flex-row gap-x-2 justify-start items-center">
                    {client.image ? (
                      <img src={client.image} alt={client.CompanyName} className="w-7 h-7 rounded-full" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center p-1">
                        <span className="text-white font-semibold">
                          {client.Initial}
                        </span>
                      </div>
                    )}
                    <div className='flex flex-col'>
                      <p className='text-slate-700'>{client.CompanyName}</p>
                      <p className='text-slate-400'>{client.Address}</p>
                    </div>
                  </div>
                </td>
                <td className='py-3 px-3'>
                  <div className='flex flex-col'>
                    <div className="flex flex-row justify-start items-center gap-x-2">
                      <MdOutlineMail className='text-slate-400' />
                      <p className='text-slate-700'>{client.Email}</p>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-x-2">
                      <MdOutlineLocalPhone className='text-slate-400' />
                      <p className='text-slate-400'>{client.PhoneNumber}</p>
                    </div>
                  </div>
                </td>
                <td className='py-3 px-3'>{format(new Date(client.createdAt), 'dd MMMM yyyy')}</td>
                <td className='py-3 px-3'>
                  <div className={client.IsActive === true ? 'bg-green-100 text-green-600 p-1 text-center rounded-full' : 'bg-red-100 text-red-600 p-1 text-center rounded-full'}>
                    {client.IsActive === true ? 'Active' : "Inactive"}
                  </div>
                </td>
                <td>
                  <div className="flex flex-row gap-x-3 justify-center items-center">
                    <LuClipboardEdit className='text-lg hover:text-cyan-500 text-cyan-700' onClick={() => handleEditClient(client)} />
                    <div className='border-l h-5 border-slate-400'></div>
                    <BsTrash3 className='text-lg hover:text-red-500 text-red-700' onClick={() => handleDeleteClient(client)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>
          Showing {currentPage} to {totalItems} of {totalResult} entries
        </span>

        <div className="flex flex-row justify-end items-center space-x-2">
          <div className="flex flex-row justify-center items-center space-x-2">
            <p className="text-xs ">Per page</p>
            <select
              value={totalItems}
              onChange={(e) => setTotalItems(Number(e.target.value))}
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
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-white text-blue-500"}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 border rounded-md  ${currentPage === totalPage ? 'text-gray-500 bg-gray-100' : 'text-blue-500 bg-white'} `}
              onClick={handleNext}
              disabled={currentPage === totalPage}
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSave={handleSaveClient}
        client={selectedClient}
      />
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete ${selectedClient?.CompanyName}?`}
      />
    </div>
  )
}
