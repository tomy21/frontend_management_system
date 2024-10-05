import React, { useEffect, useState } from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { BsTrash3 } from 'react-icons/bs'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { LuClipboardEdit, LuFilter } from 'react-icons/lu'
import { ApiLocation } from '../Utils/apiLocation'
import { format } from 'date-fns';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import ConfirmDeleteModal from '../component/modal/ServiceConfirmDelete'

export default function Location() {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalItems, setTotalItems] = useState(10);
  const [limit, setLimit] = useState(10);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, totalItems, search, limit]);

  const fetchData = async () => {
    try {
      const response = await ApiLocation.getAll(currentPage, totalItems, search);
      setData(response.data);
      setTotalPage(response.totalPages);
      setCurrentPage(response.currentPage);
      setTotalItems(response.totalItems);
    } catch (error) {
      console.error("Failed to fetch service types:", error);
    }
  };

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

  const handleAddServiceType = () => {
    setSelectedService(null);
    setIsAddModalOpen(true);
  };

  const handleEditServiceType = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const handleDeleteServiceType = (service) => {
    setSelectedService(service);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedService(null);
  };


  const handleDeleteServiceTypeConfirm = async (id) => {
    try {
      await ApiLocation.deleteLocation(id);
      handleCloseModal();
      fetchData();
    } catch (error) {
      console.error("Failed to delete service type:", error);
    }
  };
  return (
    <div className='w-full'>
      <h1 className="text-xl font-bold mb-2">
        Master Location
      </h1>
      <div className="flex justify-between items-center mt-7">
        <input type="search" name="search" id="search" className='border border-slate-300 rounded-md px-2 py-3 text-xs w-72' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />

        <div className="flex flex-row space-x-3 justify-center items-center">
          <button className='flex flex-row space-x-2 text-sm text-sky-500 border-slate-400 justify-center items-center' onClick={handleAddServiceType}>
            <IoIosAddCircleOutline />
            <p>Add Service</p>
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

      <div className="overflow-x-auto max-h-[56vh] w-full mt-2 ">
        <table className='table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer'>
          <thead className=''>
            <tr>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[5%]'>#</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[20%]'>Name</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[30%]'>Address</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[10%]'>Longitude</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[10%]'>Latitude</th>
              <th className='p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[10%]'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((service, index) => (
              <tr key={index}>
                <td className='py-3 px-3'>{index + 1}</td>
                <td className='py-3 px-3'>{service.LocationName}</td>
                <td className='py-3 px-3'>{service.Address}</td>
                <td className='py-3 px-3'>{service.Longitude}</td>
                <td className='py-3 px-3'>{service.Latitude}</td>
                <td className='py-3 px-3'>
                  <div className="flex flex-row space-x-3 justify-center items-center">
                    <LuClipboardEdit className='text-lg text-cyan-700 hover:text-cyan-500 cursor-pointer' onClick={() => handleEditServiceType(service)} />
                    <div className='border-l h-5 border-slate-400'></div>
                    <BsTrash3 className='text-lg text-red-700 hover:text-red-500 cursor-pointer' onClick={() => handleDeleteServiceType(service)} />
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
          Showing {currentPage} to {limit} of {totalItems} entries
        </span>

        <div className="flex flex-row justify-end items-center space-x-2">
          <div className="flex flex-row justify-center items-center space-x-2">
            <p className="text-xs ">Per page</p>
            <select
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
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
      {/* <ServiceTypeModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveServiceType}
        service={isEditModalOpen ? selectedService : null}
      /> */}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteServiceTypeConfirm}
        service={selectedService}
      />
    </div>
  )
}
