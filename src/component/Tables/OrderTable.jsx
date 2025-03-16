import React, { useState } from "react";

const OrderTable = () => {
  const orders = [
    {
      id: 1,
      clientName: "Tomy Agung",
      serviceType: "Consulting",
      method: "Online",
      dateRange: "01 Aug 24 - 03 Aug 24",
    },
    {
      id: 1,
      clientName: "Tomy Agung",
      serviceType: "Consulting",
      method: "Online",
      dateRange: "01 Aug 24 - 03 Aug 24",
    },
    {
      id: 2,
      clientName: "Briana Pangestu",
      serviceType: "Training",
      method: "Offline",
      dateRange: "02 Aug 24 - 04 Aug 24",
    },
    {
      id: 2,
      clientName: "Briana Pangestu",
      serviceType: "Training",
      method: "Offline",
      dateRange: "02 Aug 24 - 04 Aug 24",
    },
    {
      id: 2,
      clientName: "Briana Pangestu",
      serviceType: "Training",
      method: "Offline",
      dateRange: "02 Aug 24 - 04 Aug 24",
    },
    {
      id: 2,
      clientName: "Briana Pangestu",
      serviceType: "Training",
      method: "Offline",
      dateRange: "02 Aug 24 - 04 Aug 24",
    },
    {
      id: 2,
      clientName: "Briana Pangestu",
      serviceType: "Training",
      method: "Offline",
      dateRange: "02 Aug 24 - 04 Aug 24",
    },
    {
      id: 2,
      clientName: "Briana Pangestu",
      serviceType: "Training",
      method: "Offline",
      dateRange: "02 Aug 24 - 04 Aug 24",
    },
    {
      id: 2,
      clientName: "Briana Pangestu",
      serviceType: "Training",
      method: "Offline",
      dateRange: "02 Aug 24 - 04 Aug 24",
    },
    // Add more orders if needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="overflow-x-auto">
        <div className="relative overflow-y-auto max-h-[65vh]">
          <table className="table w-full border border-gray-200 rounded-lg shadow-md text-xs">
            <thead className="sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="p-2 text-left">Client</th>
                <th className="p-2 text-left">Service Type</th>
                <th className="p-2 text-left">Method</th>
                <th className="p-2 text-left">Date Range</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 border-b">
                  <td className="p-2">{order.clientName}</td>
                  <td className="p-2">{order.serviceType}</td>
                  <td className="p-2">{order.method}</td>
                  <td className="p-2">{order.dateRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default OrderTable;
