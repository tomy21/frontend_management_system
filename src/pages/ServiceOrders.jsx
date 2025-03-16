import React, { useState } from "react";
import OrderModal from "../component/modal/OrderModal";
import TitleHeaders from "../component/TitleHeaders";
import { OrdersApi } from "../Utils/OrderApi";
import { useOrderProvider } from "../Context/ServiceOrder";
import { ScaleLoader } from "react-spinners";
import AddButton from "../component/Button/AddButton";
import SuccessNotifi from "../component/Notifikasi/SuccessNotifi";
import Confirmation from "../component/modal/Confirmation";
import Pagination from "../component/Pagination";
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md";
import { format } from "date-fns";
import { BiSolidEditAlt } from "react-icons/bi";
import ClientProvider from "../Context/ClientProvider";
import ServiceTypeProvider from "../Context/ServiceTypeProvider";
import { useNavigate } from "react-router-dom";

export default function ServiceOrders() {
  const {
    dataOrder,
    page,
    limit,
    totalPages,
    totalItems,
    setPage,
    setLimit,
    setSearch,
    reloadDataOrder,
  } = useOrderProvider();

  console.log(dataOrder);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const [idLocation, setIdLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true); // Membuka modal
  const closeModal = () => setIsModalOpen(false);
  const openIsSuccess = () => setIsSuccess(true);
  const closeIsSuccess = () => setIsSuccess(false);
  const closeModalEdit = () => setOpenModalEdit(false);

  const handleSuccessAdd = () => {
    reloadDataOrder();
    closeIsSuccess();
    setIdLocation("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
  };

  const handleEdit = (id) => {
    setIdLocation(id);
    navigate(`/service-orders/detail-orders/${id}`);
  };

  const handleDelete = async (id) => {
    setIdLocation(id);
    setOpenModalConfirmation(true);
  };

  const actionDelete = async () => {
    setIsLoading(true);
    try {
      const response = await OrdersApi.delete(idLocation);

      if (response.status === "success") {
        openIsSuccess(true);
        reloadDataOrder();
        setOpenModalConfirmation(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center mb-3 z-30">
            <ScaleLoader size={250} color={"#ffff"} loading={true} />
          </div>
        </div>
      )}
      <TitleHeaders
        title={"Service Order"}
        subtitle={"Manage your order here"}
      />
      <div className="flex justify-between items-center">
        <input
          type="search"
          name="search"
          id="search"
          className="border border-slate-300 rounded-md px-2 py-3 text-xs w-72"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div className="flex flex-row space-x-3 justify-center items-center">
          <AddButton title={"Add Order"} onClick={openModal} />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[56vh] w-full mt-2 ">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer">
          <thead className="">
            <tr>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                #
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Create Date
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Order Code
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Client Info
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Address
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Class
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Consultant
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Status
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dataOrder.length > 0 ? (
              dataOrder.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-3">{index + 1}</td>
                  <td className="py-3 px-3">
                    {format(new Date(item.CreatedAt), "dd MMM yy HH:mm")}
                  </td>
                  <td className="py-3 px-3">{item.OrderId}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-col">
                      <div className="flex flex-row justify-start items-center gap-x-2">
                        <MdOutlineMail className="text-slate-400" />
                        <p className="text-slate-700">{item.Client.Email}</p>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-x-2">
                        <MdOutlineLocalPhone className="text-slate-400" />
                        <p className="text-slate-400">
                          {item.Client.PhoneNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <a
                      href={item.ShareUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {item.Address}
                    </a>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-row justify-center items-center gap-x-2 bg-yellow-400 py-1 px-3 rounded-md">
                      <p className="text-slate-400">{item.ClassMode}</p>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-black">
                    <div className="flex items-center -space-x-2">
                      {item.Consultants?.slice(0, 5).map((data, index) => {
                        const initials = data.UserName.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase();

                        return (
                          <div
                            key={index}
                            className="w-8 h-8 flex items-center justify-center bg-gray-300 text-black font-bold rounded-full border-2 border-white text-sm"
                          >
                            {initials}
                          </div>
                        );
                      })}
                      {item.Consultants?.length > 5 && (
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-500 text-white font-bold rounded-full border-2 border-white text-sm">
                          +{item.Consultants.length - 5}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="flex flex-row gap-x-2 justify-start items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          item.Status === "Created" ? "bg-success" : "bg-danger"
                        }`}
                      ></div>
                      <div className="text-xs text-success font-medium">
                        {item.Status}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex flex-row gap-x-5 justify-center items-center">
                      <BiSolidEditAlt
                        onClick={() => handleEdit(item.Id)}
                        className="text-lg hover:text-cyan-500"
                      />
                      <BsTrash3
                        onClick={() => handleDelete(item.Id)}
                        className="text-lg hover:text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-3 px-3 text-center">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full">
        <Pagination
          currentPage={page} // set current page properly
          totalPages={totalPages} // adjust based on the length of data
          setPageCurrent={setPage}
          totalItem={totalItems}
          limit={limit}
          setLimitData={setLimit}
        />
      </div>

      {isModalOpen && (
        <ClientProvider>
          <ServiceTypeProvider>
            <OrderModal
              isOpen={isModalOpen}
              onClose={closeModal}
              isSuccess={openIsSuccess}
            />
          </ServiceTypeProvider>
        </ClientProvider>
      )}

      {isSuccess && (
        <SuccessNotifi isOpen={isSuccess} onClose={handleSuccessAdd} />
      )}

      {/* {openModalEdit && (
        <EditLocation
          isOpen={openModalEdit}
          onClose={closeModalEdit}
          isSuccess={openIsSuccess}
          id={idLocation}
        />
      )} */}

      {openModalConfirmation && (
        <Confirmation
          isOpen={openModalConfirmation}
          onClose={() => setOpenModalConfirmation(false)}
          submit={actionDelete}
        />
      )}
    </>
  );
}
