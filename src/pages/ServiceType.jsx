import React, { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import TitleHeaders from "../component/TitleHeaders";
import AddButton from "../component/Button/AddButton";
import ExportButton from "../component/Button/ExportButton";
import FilterButton from "../component/Button/FilterButton";
import { useServiceType } from "../Context/ServiceTypeProvider";
import Pagination from "../component/Pagination";
import Add from "../component/modal/ServiceType/Add";
import SuccessNotifi from "../component/Notifikasi/SuccessNotifi";
import Edit from "../component/modal/ServiceType/Edit";
import Confirmation from "../component/modal/Confirmation";
import { ServiceTypeApi } from "../Utils/ServiceTypeApi";
import { ScaleLoader } from "react-spinners";
import { BiSolidEditAlt } from "react-icons/bi";

export default function ServiceType() {
  const {
    serviceType,
    page,
    limit,
    totalPages,
    totalItems,
    setPage,
    setLimit,
    setSearch,
    reloadServiceTypes,
  } = useServiceType();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const [idServiceType, setIdServiceType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true); // Membuka modal
  const closeModal = () => setIsModalOpen(false);
  const openIsSuccess = () => setIsSuccess(true);
  const closeIsSuccess = () => setIsSuccess(false);
  const closeModalEdit = () => setOpenModalEdit(false);

  const handleSuccessAdd = () => {
    reloadServiceTypes();
    closeIsSuccess();
    setIdServiceType("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
  };

  const handleEdit = (id) => {
    setIdServiceType(id);
    setOpenModalEdit(true);
  };

  const handleDelete = async (id) => {
    setIdServiceType(id);
    setOpenModalConfirmation(true);
  };

  const actionDelete = async () => {
    setIsLoading(true);
    try {
      const response = await ServiceTypeApi.deleteServiceType(idServiceType);
      console.log(response);
      if (response.status === "success") {
        openIsSuccess(true);
        reloadServiceTypes();
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
        title={"Service Type"}
        subtitle={"Manage your service here"}
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
          <AddButton title={"Add Data"} onClick={openModal} />
          <ExportButton title={"Export"} />
          <FilterButton title={"Filter"} />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[56vh] w-full mt-2 ">
        <table className="table table-zebra table-xs table-pin-rows text-xs cursor-pointer">
          <thead className="">
            <tr>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[5%]">
                #
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[20%]">
                Service Type
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[20%]">
                Initial
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[20%]">
                Description
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[15%]">
                Create Date
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200 w-[15%]"></th>
            </tr>
          </thead>
          <tbody>
            {serviceType.length > 0 ? (
              serviceType.map((data, index) => (
                <tr key={index}>
                  <td className="py-3 px-3">{index + 1}</td>
                  <td className="py-3 px-3">{data.TypeName}</td>
                  <td className="py-3 px-3">{data.Initial}</td>
                  <td className="py-3 px-3">{data.Description}</td>
                  <td className="py-3 px-3">{data.CreatedAt}</td>
                  <td className="py-3 px-3">
                    <div className="flex flex-row gap-x-6 justify-center items-center">
                      <BiSolidEditAlt
                        onClick={() => handleEdit(data.Id)}
                        className="text-lg hover:text-cyan-500"
                      />
                      <BsTrash3
                        onClick={() => handleDelete(data.Id)}
                        className="text-lg hover:text-red-500"
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-3 px-3" colSpan={6}>
                  Data Not Found
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
        <Add
          isOpen={isModalOpen}
          onClose={closeModal}
          isSuccess={openIsSuccess}
        />
      )}

      {isSuccess && (
        <SuccessNotifi isOpen={isSuccess} onClose={handleSuccessAdd} />
      )}

      {openModalEdit && (
        <Edit
          isOpen={openModalEdit}
          onClose={closeModalEdit}
          isSuccess={openIsSuccess}
          id={idServiceType}
        />
      )}

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
