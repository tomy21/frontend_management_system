import React, { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import TitleHeaders from "../component/TitleHeaders";
import AddButton from "../component/Button/AddButton";
import { useLocationProvider } from "../Context/LocationPrivider";
import { LocationApi } from "../Utils/LocationApi";
import { ScaleLoader } from "react-spinners";
import Pagination from "../component/Pagination";
import Confirmation from "../component/modal/Confirmation";
import AddLocation from "../component/modal/Location/AddLocation";
import SuccessNotifi from "../component/Notifikasi/SuccessNotifi";
import EditLocation from "../component/modal/Location/EditLocation";
import { BiSolidEditAlt } from "react-icons/bi";
import { format } from "date-fns";

export default function Location() {
  const {
    locationData,
    page,
    limit,
    totalPages,
    totalItems,
    setPage,
    setLimit,
    setSearch,
    reloadLocationApi,
  } = useLocationProvider();

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalConfirmation, setOpenModalConfirmation] = useState(false);
  const [idLocation, setIdLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true); // Membuka modal
  const closeModal = () => setIsModalOpen(false);
  const openIsSuccess = () => setIsSuccess(true);
  const closeIsSuccess = () => setIsSuccess(false);
  const closeModalEdit = () => setOpenModalEdit(false);

  const handleSuccessAdd = () => {
    reloadLocationApi();
    closeIsSuccess();
    setIdLocation("");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearch(e.target.value);
  };

  const handleEdit = (id) => {
    setIdLocation(id);
    setOpenModalEdit(true);
  };

  const handleDelete = async (id) => {
    setIdLocation(id);
    setOpenModalConfirmation(true);
  };

  const actionDelete = async () => {
    setIsLoading(true);
    try {
      const response = await LocationApi.delete(idLocation);
      console.log(response);
      if (response.status === "success") {
        openIsSuccess(true);
        reloadLocationApi();
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
        title={"Location Master"}
        subtitle={"Manage your location here"}
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
          <AddButton title={"Add Location"} onClick={openModal} />
        </div>
      </div>

      <div className="overflow-x-auto max-h-[56vh] w-full mt-2 ">
        <table className="table table-zebra table-xs table-pin-rows table-pin-cols text-xs cursor-pointer">
          <thead>
            <tr>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                #
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Create Date
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Location
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Longitude
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Latitude
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Address
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200">
                Category
              </th>
              <th className="p-3 border border-b border-slate-200 bg-slate-200"></th>
            </tr>
          </thead>
          <tbody>
            {locationData.length > 0 ? (
              locationData.map((item, index) => (
                <tr key={index}>
                  <td className="py-3 px-3">{index + 1}</td>
                  <td className="py-3 px-3">
                    {format(new Date(item.CreatedAt), "dd MMM yy HH:mm")}
                  </td>
                  <td className="py-3 px-3">{item.LocationName}</td>
                  <td className="py-3 px-3">{item.Longitude}</td>
                  <td className="py-3 px-3">{item.Latitude}</td>
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
                  <td className="py-3 px-3">{item.Type}</td>
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
        <AddLocation
          isOpen={isModalOpen}
          onClose={closeModal}
          isSuccess={openIsSuccess}
        />
      )}

      {isSuccess && (
        <SuccessNotifi isOpen={isSuccess} onClose={handleSuccessAdd} />
      )}

      {openModalEdit && (
        <EditLocation
          isOpen={openModalEdit}
          onClose={closeModalEdit}
          isSuccess={openIsSuccess}
          id={idLocation}
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
