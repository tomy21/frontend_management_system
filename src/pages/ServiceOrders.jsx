import React, { useEffect, useState } from 'react';
import { serviceOrders } from '../Utils/apiManageClient';
import { FaArrowLeftLong, FaArrowRightLong, FaEllipsis } from 'react-icons/fa6';
import { IoIosAddCircleOutline } from 'react-icons/io';
import AddServiceOrders from '../component/modal/AddServiceOrders';
import DetailServiceOrder from '../component/modal/DetailServiceOrder';
import AddConsultan from '../component/modal/AddConsultan';

export default function ServiceOrders() {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalItems, setTotalItems] = useState(0);
  const [activeStatus, setActiveStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [showModalRelease, setShowModalRelease] = useState(false);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [limit, setLimit] = useState(5);
  const [serviceId, setServiceId] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const [statusCounts, setStatusCounts] = useState({
    All: 0,
    Created: 0,
    Release: 0,
    PartialExecute: 0,
    Execute: 0,
    Invoiced: 0,
    Paid: 0,
    PartialCompleted: 0,
    Completed: 0,
    Canceled: 0,
  });

  const statusTabs = [
    'All',
    'Created',
    'Release',
    'Partial Execute',
    'Execute',
    'Invoiced',
    'Paid',
    'Partial Completed',
    'Completed',
    'Canceled',
  ];

  const handleEditModal = (id) => {
    // Set service ID dan buka modal, baru kemudian tutup dropdown
    setServiceId(id);
    setShowModalDetail(true);

    // Tutup dropdown setelah modal terbuka
    setDropdownOpen(null);
  };

  const handleOptionClick = (serviceId, option) => {
    if (option === 'Release') {
      setServiceId(serviceId);
      setShowModalRelease(true)
    } else if (option === 'Invoicing') {
      // service.Status = 'Invoiced';
    }
    setDropdownOpen(null);
  };

  const getDropdownOptions = (status) => {
    if (status === 'Created') {
      return ['Release']
    } else if (status === 'Release') {
      return ['Invoicing'];
    }
    return [];
  };

  const fetchData = async (status = 'All') => {
    try {
      const response = await serviceOrders.getAll(currentPage, limit, search, activeStatus);
      setData(response.data);
      setTotalPage(response.totalPages);
      setTotalItems(response.totalItems);
      setStatusCounts({
        All: response.totalItems,
        Created: response.statusCounts.Created,
        Release: response.statusCounts.Release,
        PartialExecute: response.statusCounts.PartialExecute,
        Execute: response.statusCounts.Execute,
        Invoiced: response.statusCounts.Invoiced,
        Paid: response.statusCounts.Paid,
        PartialCompleted: response.statusCounts.PartialCompleted,
        Completed: response.statusCounts.Completed,
        Canceled: response.statusCounts.Canceled,
      });
    } catch (error) {
      console.error('Failed to fetch service orders:', error);
    }
  };

  useEffect(() => {
    fetchData(activeStatus);

    const handleClickOutside = (event) => {
      if (dropdownOpen !== null && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(null); // Close dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [currentPage, totalItems, search, activeStatus, limit, dropdownOpen]);


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

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setCurrentPage(1);
    fetchData();
  };

  const handleAddOrders = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchData();
  };

  const handleCloseModalDetail = () => {
    setShowModalDetail(false);
  };
  const handleCloseModalRelease = () => {
    setShowModalRelease(false);
    fetchData()
  };

  return (
    <div className="w-full">
      <h1 className="text-xl font-bold">Service Orders</h1>

      <div className="flex space-x-2 mb-4 mt-5 border-b pb-2 text-xs">
        {statusTabs.map((status) => (
          <button
            key={status}
            className={`py-2 px-2 flex items-center ${activeStatus === status
              ? 'text-blue-600 bg-blue-50 border-b-2 border-blue-600'
              : 'text-gray-500'
              }`}
            onClick={() => handleStatusChange(status)}
          >
            {status}
            <span className="ml-2 bg-gray-200 text-xs rounded-full px-2 py-1 text-gray-700">
              {statusCounts[status.replace(/\s+/g, '')]}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center mt-3">
        <input
          type="search"
          name="search"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-slate-300 rounded-md px-2 py-3 text-xs w-72"
          placeholder="Search"
        />

        <div className="flex flex-row space-x-3 justify-center items-center">
          <button
            className="flex flex-row space-x-2 text-sm text-sky-500 border-slate-400 justify-center items-center hover:bg-blue-100 px-3 py-2 rounded-md"
            onClick={handleAddOrders}
          >
            <IoIosAddCircleOutline />
            <p>Add Client</p>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto max-h-[56vh] w-full mt-3 ">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer">
          <thead className="">
            <tr>
              <th className="p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[5%]">#</th>
              <th className="p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[15%]">
                Code Orders
              </th>
              <th className="p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[15%]">
                Client
              </th>
              <th className="p-3 border-b-2 text-black border-gray-700 bg-gray-300">Contact</th>
              <th className="p-3 border-b-2 text-black border-gray-700 bg-gray-300">Partisipan</th>
              <th className="p-3 border-b-2 text-black border-gray-700 bg-gray-300 w-[15%]">
                Service Type
              </th>
              <th className="p-3 border-b-2 text-black border-gray-700 bg-gray-300 ">Content</th>
              <th className="p-3 border-b-2 text-black border-gray-700 bg-gray-300">Status</th>
              <th className="p-3 border-b-2 text-black border-gray-700 bg-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((service, index) => (
                <tr key={service.Id}>
                  <td className="py-3 px-3">{index + 1}</td>
                  <td className="py-3 px-3">{service.OrderId}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-xs font-semibold">{service.Client?.CompanyName}</p>
                      <p className="text-xs text-slate-400">{service.Client?.Address}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3">{service.Client?.Email}</td>
                  <td className="py-3 px-3">{service.CountPartisipan}</td>
                  <td className="py-3 px-3">{service.ServiceType}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-col justify-start items-start">
                      <p className="text-xs font-semibold">{service.Title}</p>
                      <p className="text-xs">{service.Description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div
                      className={`p-2 text-center rounded-lg ${service.Status === 'Created'
                        ? 'bg-gray-200 text-gray-700'
                        : service.Status === 'Release'
                          ? 'bg-yellow-200 text-yellow-700'
                          : service.Status === 'Execute'
                            ? 'bg-blue-200 text-blue-700'
                            : service.Status === 'Invoiced'
                              ? 'bg-purple-200 text-purple-700'
                              : service.Status === 'Paid'
                                ? 'bg-green-200 text-green-700'
                                : service.Status === 'Completed'
                                  ? 'bg-green-500 text-white'
                                  : service.Status === 'Canceled'
                                    ? 'bg-red-200 text-red-700'
                                    : 'bg-gray-100'
                        }`}
                    >
                      {service.Status}
                    </div>
                  </td>
                  <td>
                    <div className="relative dropdown-container">
                      <FaEllipsis
                        onClick={() =>
                          setDropdownOpen(dropdownOpen === service.Id ? null : service.Id)
                        }
                        className="text-lg hover:text-cyan-500 text-cyan-700 cursor-pointer"
                      />
                      {dropdownOpen === service.Id && (
                        <div className="absolute right-0 mt-2 w-32 bg-slate-100 border rounded-lg shadow-lg z-30">
                          <ul>
                            <li
                              key={index}
                              className="p-2 hover:bg-blue-700 hover:text-white cursor-pointer rounded-lg"
                              onClick={() => handleEditModal(service.Id)}
                            >
                              Detail
                            </li>
                            {getDropdownOptions(service.Status).map((option, index) => (
                              <li
                                key={index}
                                className="p-2 hover:bg-blue-700 hover:text-white cursor-pointer rounded-lg"
                                onClick={() => handleOptionClick(service.Id, option)}
                              >
                                {option}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-10 text-center">
                  <div className="flex flex-row items-center justify-center">
                    <span className="text-gray-500 text-lg">Data Not Found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
              className={`px-3 py-1 border rounded-md  ${currentPage === 1 ? 'text-gray-500 bg-gray-100' : 'text-blue-500 bg-white'
                } `}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <FaArrowLeftLong />
            </button>
            {Array.from({ length: totalPage }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              className={`px-3 py-1 border rounded-md  ${currentPage === totalPage ? 'text-gray-500 bg-gray-100' : 'text-blue-500 bg-white'
                } `}
              onClick={handleNext}
              disabled={currentPage === totalPage}
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>
      </div>
      {showModal && <AddServiceOrders showModal={showModal} setShowModal={handleCloseModal} />}
      {showModalDetail && (
        <DetailServiceOrder
          showModalDetail={showModalDetail}
          setShowModalDetail={handleCloseModalDetail}
          serviceId={serviceId}
        />
      )}
      {showModalRelease && (
        <AddConsultan
          showModalRelease={showModalRelease}
          setShowModalRelease={handleCloseModalRelease}
          serviceId={serviceId}
        />
      )}
    </div>
  );
}
