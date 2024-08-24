import React, { useEffect, useState } from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { BsTrash3 } from 'react-icons/bs';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { LuClipboardEdit, LuFilter } from 'react-icons/lu';
import { MdOutlineLocalPhone, MdOutlineMail } from 'react-icons/md';
import { createClient, deleteClient, getAllClient, updateClient } from '../Utils/apiManageClient';
import { format } from 'date-fns';
import ClientModal from '../component/modal/ClientModal'; // Import ClientModal component
import ConfirmModal from '../component/modal/ClientConfirmationDelete'; // Import ConfirmModal component

export default function Client() {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalItems, setTotalItems] = useState(10); // Default 10 items per page
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);
  const [lastUpdate, setLastUpdate] = useState("0");

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null); // Client data for edit

  const fetchData = async () => {
    try {
      const response = await getAllClient.getAll(currentPage, totalItems, search);
      setData(response.data.clients);
      setTotalPage(response.data.pagination.totalPages);
      setActive(response.data.activeClientsCount);
      setInactive(response.data.inactiveClientsCount);
      setLastUpdate(response.data.lastUpdate);
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

  const handleItemsPerPageChange = (e) => {
    setTotalItems(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
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

  const handleSaveClient = async (clientData) => {
    try {
      if (selectedClient) {
        await updateClient.updateClient(selectedClient.id, clientData);
      } else {
        await createClient.create(clientData);
      }
      setIsClientModalOpen(false);
      fetchData(); // Reload data setelah save
    } catch (error) {
      console.error("Failed to save client:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteClient.deleteClient(selectedClient.id);
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
      <div className="flex flex-row w-[25%] justify-center items-center border border-slate-300 px-5 py-3 rounded-md">
        <div className="flex flex-col w-full space-y-5">
          <h1 className='text-sm font-medium'>Total Clients</h1>
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
              <th className='p-3 border-r border-b border-slate-200 w-[5%]'>#</th>
              <th className='p-3 border-r border-b border-slate-200 w-[20%]'>Client Code</th>
              <th className='p-3 border-r border-b border-slate-200 w-[20%]'>Profile</th>
              <th className='p-3 border-r border-b border-slate-200 w-[20%]'>Contact</th>
              <th className='p-3 border-r border-b border-slate-200 w-[15%]'>Join Date</th>
              <th className='p-3 border-r border-b border-slate-200 w-[10%]'>Status</th>
              <th className='p-3 border-b border-slate-200 w-[15%]'>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((client, index) => (
              <tr key={index}>
                <td className='py-3 px-3'>{index + 1}</td>
                <td className='py-3 px-3'>{client.code}</td>
                <td className='py-3 px-3'>
                  <div className="flex flex-row gap-x-2 justify-start items-center">
                    {client.image ? (
                      <img src={client.image} alt={client.name} className="w-7 h-7 rounded-full" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {client.name.split(" ").map(word => word[0]).join("")}
                        </span>
                      </div>
                    )}
                    <div className='flex flex-col'>
                      <p className='text-slate-700'>{client.name}</p>
                    </div>
                  </div>
                </td>
                <td className='py-3 px-3'>
                  <div className='flex flex-col'>
                    <div className="flex flex-row justify-start items-center gap-x-2">
                      <MdOutlineMail className='text-slate-400' />
                      <p className='text-slate-700'>{client.email}</p>
                    </div>
                    <div className="flex flex-row justify-start items-center gap-x-2">
                      <MdOutlineLocalPhone className='text-slate-400' />
                      <p className='text-slate-400'>{client.contact_phone}</p>
                    </div>
                  </div>
                </td>
                <td className='py-3 px-3'>{format(new Date(client.createdAt), 'dd MMMM yyyy')}</td>
                <td className='py-3 px-3'>
                  <div className={client.status === 1 ? 'bg-cyan-100 text-cyan-600 p-1 text-center rounded-full' : 'bg-red-100 text-red-600 p-1 text-center rounded-full'}>
                    {client.status === 1 ? 'Active' : "Inactive"}
                  </div>
                </td>
                <td>
                  <div className="flex flex-row gap-x-3 justify-center items-center">
                    <BsTrash3 className='text-lg hover:text-red-500' onClick={() => handleDeleteClient(client)} />
                    <LuClipboardEdit className='text-lg hover:text-cyan-500' onClick={() => handleEditClient(client)} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <label htmlFor="itemsPerPage" className="mr-2 text-sm">Items per page:</label>
          <select
            id="itemsPerPage"
            value={totalItems}
            onChange={handleItemsPerPageChange}
            className="border border-slate-300 rounded-md px-2 py-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        <div className="flex space-x-2">
          {Array.from({ length: totalPage }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
            >
              {index + 1}
            </button>
          ))}
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
        message={`Are you sure you want to delete ${selectedClient?.name}?`}
      />
    </div>
  )
}
