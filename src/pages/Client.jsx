import React, { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { MdOutlineLocalPhone, MdOutlineMail } from "react-icons/md";
import { format } from "date-fns";
import TitleHeaders from "../component/TitleHeaders";
import { useClientProvider } from "../Context/ClientProvider";
import { ClientApi } from "../Utils/apiManageClient";
import { ScaleLoader } from "react-spinners";
import AddButton from "../component/Button/AddButton";
import Pagination from "../component/Pagination";
import AddClient from "../component/modal/Client/AddClient";
import SuccessNotifi from "../component/Notifikasi/SuccessNotifi";
import Confirmation from "../component/modal/Confirmation";
import EditClient from "../component/modal/Client/EditClient";
import { BiSolidEditAlt } from "react-icons/bi";

export default function Client() {
  const {
    clientData,
    page,
    limit,
    totalPages,
    totalItems,
    totalActive,
    totalInActive,
    setPage,
    setLimit,
    setSearch,
    reloadClientApi,
  } = useClientProvider();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const [idClient, setIdClient] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openIsSuccess = () => setIsSuccess(true);
  const closeIsSuccess = () => setIsSuccess(false);
  const closeModalEdit = () => setOpenModalEdit(false);

  const handleSuccessAdd = () => {
    reloadClientApi();
    closeIsSuccess();
    setIdClient("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
  };

  const handleEdit = (id) => {
    setIdClient(id);
    setOpenModalEdit(true);
  };

  const handleDelete = async (id) => {
    setIdClient(id);
    setOpenModalConfirmation(true);
  };

  const actionDelete = async () => {
    setIsLoading(true);
    try {
      const response = await ClientApi.deleteClient(idClient);
      console.log(response);
      if (response.status === "success") {
        openIsSuccess(true);
        reloadClientApi();
        setOpenModalConfirmation(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }; // Client data for edit

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center mb-3 z-30">
            <ScaleLoader size={250} color={"#ffff"} loading={true} />
          </div>
        </div>
      )}
      <TitleHeaders title={"Client"} subtitle={"Manage your client here"} />
      <div className="w-full">
        {/* Total Clients Information */}
        <div className="flex flex-row w-[25%] justify-end items-end px-5 py-3">
          <div className="flex flex-col w-full space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-lg font-semibold">
                  {totalActive}{" "}
                  <span className="text-xs font-medium text-slate-500">
                    Clients
                  </span>
                </h1>
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                  <div className="text-xs text-success font-medium">Active</div>
                </div>
              </div>

              <div className="flex flex-col gap-y-2 border-l pl-10 border-slate-300">
                <h1 className="text-lg font-semibold">
                  {totalInActive}{" "}
                  <span className="text-xs font-medium text-slate-500">
                    Clients
                  </span>
                </h1>
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <div className="text-xs text-success font-medium">
                    Non Active
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex justify-between items-center mt-7">
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
            <AddButton title={"Add Client"} onClick={openModal} />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto max-h-[56vh] w-full mt-2 ">
          <table className="table table-zebra table-xs table-pin-rows text-xs cursor-pointer">
            <thead className="">
              <tr>
                <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[5%]">
                  #
                </th>
                {/* <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[20%]">
                  Client Code
                </th> */}
                <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[20%]">
                  Profile
                </th>
                <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[20%]">
                  Contact
                </th>
                <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[15%]">
                  Join Date
                </th>
                <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[10%]">
                  Status
                </th>
                <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[15%]"></th>
              </tr>
            </thead>
            <tbody>
              {clientData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-3 px-3 text-center">
                    No data available
                  </td>
                </tr>
              ) : (
                clientData.map((client, index) => (
                  <tr key={index}>
                    <td className="py-3 px-3">{index + 1}</td>
                    {/* <td className="py-3 px-3">{client.code}</td> */}
                    <td className="py-3 px-3">
                      <div className="flex flex-row gap-x-2 justify-start items-center">
                        {client.image ? (
                          <img
                            src={client.image}
                            alt={client.name}
                            className="w-7 h-7 rounded-full"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {client.Initial}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <p className="text-slate-700">{client.CompanyName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <div className="flex flex-row justify-start items-center gap-x-2">
                          <MdOutlineMail className="text-slate-400" />
                          <p className="text-slate-700">{client.Email}</p>
                        </div>
                        <div className="flex flex-row justify-start items-center gap-x-2">
                          <MdOutlineLocalPhone className="text-slate-400" />
                          <p className="text-slate-400">{client.PhoneNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      {format(new Date(client.createdAt), "dd MMMM yyyy")}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-row gap-x-2 justify-start items-center">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            client.IsActive ? "bg-success" : "bg-danger"
                          }`}
                        ></div>
                        <div className="text-xs text-success font-medium">
                          {client.IsActive ? "Active" : "InActive"}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex flex-row gap-x-5 justify-center items-center">
                        <BiSolidEditAlt
                          onClick={() => handleEdit(client.Id)}
                          className="text-lg hover:text-cyan-500"
                        />
                        <BsTrash3
                          onClick={() => handleDelete(client.Id)}
                          className="text-lg hover:text-red-500"
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
          <AddClient
            isOpen={isModalOpen}
            onClose={closeModal}
            isSuccess={openIsSuccess}
          />
        )}

        {isSuccess && (
          <SuccessNotifi isOpen={isSuccess} onClose={handleSuccessAdd} />
        )}

        {openModalConfirmation && (
          <Confirmation
            isOpen={openModalConfirmation}
            onClose={() => setOpenModalConfirmation(false)}
            submit={actionDelete}
          />
        )}

        {openModalEdit && (
          <EditClient
            isOpen={openModalEdit}
            onClose={closeModalEdit}
            isSuccess={openIsSuccess}
            id={idClient}
          />
        )}

        {/* Modals */}
        {/* <ClientModal
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
        /> */}
      </div>
    </>
  );
}
