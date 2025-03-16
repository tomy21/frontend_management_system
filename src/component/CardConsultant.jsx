import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import {
  CheckCircleOutline,
  Close,
  FactCheck,
  Person,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { IoChevronDown } from "react-icons/io5";
import { login } from "../Utils/ApiUsers";
import { AssignApi } from "../Utils/OrderApi";
import SuccessNotifi from "./Notifikasi/SuccessNotifi";
import { ScaleLoader } from "react-spinners";

const ConsultantCard = ({
  dataDetailOrder,
  consultantsListProps,
  onSuccess,
}) => {
  const [consultantsList, setConsultantsList] = useState([]);
  const [selectedConsultants, setSelectedConsultants] = useState({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [loadingId, setLoadingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchConsultantList();
  }, []);

  const fetchConsultantList = async () => {
    const response = await login.getConsultant();
    setConsultantsList(response.data?.users || []);
  };

  const toggleOption = (orderId, option) => {
    setSelectedConsultants((prev) => {
      const currentSelected = prev[orderId] || [];
      const isAlreadySelected = currentSelected.some(
        (item) => item.Id === option.Id
      );
      return {
        ...prev,
        [orderId]: isAlreadySelected
          ? currentSelected.filter((item) => item.Id !== option.Id)
          : [...currentSelected, option],
      };
    });
  };

  const removeOption = (orderId, option) => {
    setSelectedConsultants((prev) => ({
      ...prev,
      [orderId]: prev[orderId]?.filter((item) => item.Id !== option.Id) || [],
    }));
  };

  const handleSave = async (orderId) => {
    setIsLoading(true);
    try {
      if (selectedConsultants[orderId]?.length > 0) {
        const consultantIdsArray = selectedConsultants[orderId].map(
          (consultant) => consultant.Id
        );
        const response = await AssignApi.assignConsultant(
          orderId,
          consultantIdsArray
        );
        if (response.statusCode === 200) {
          setTimeout(() => setIsSuccess(false), 3000);
          setIsSuccess(true);
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isSuccess && <SuccessNotifi isOpen={isSuccess} />}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center mb-3 z-30">
            <ScaleLoader size={250} color={"#ffff"} loading={true} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 gap-6 w-full mt-5">
        {dataDetailOrder.map((item) => (
          <div
            key={item.Id}
            className="flex flex-col bg-white shadow-lg rounded-xl p-5 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-lg font-semibold text-gray-800">
                {item.Date}
              </h1>
              <p className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                {item.Status}
              </p>
            </div>

            {/* Jika sudah ada Consultants, tampilkan tanpa bisa diedit */}
            {item.ConsultantIds?.length > 0 ? (
              <div>
                {item.ConsultantIds?.map((consultantId, index) => {
                  const consultant = consultantsListProps.find(
                    (c) => c.Id === consultantId
                  );
                  return (
                    <div key={index} className="flex items-center mb-2">
                      <Person className="text-green-500 mr-2" />
                      <span className="text-gray-600">
                        {consultant
                          ? consultant.UserName
                          : "Unknown Consultant"}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              // Jika belum ada, tampilkan dropdown Listbox untuk memilih consultant
              <>
                <Listbox
                  value={selectedConsultants[item.Id] || []}
                  onChange={(selected) =>
                    setSelectedConsultants((prev) => ({
                      ...prev,
                      [item.Id]: selected,
                    }))
                  }
                  multiple
                >
                  <div className="relative mt-3">
                    <ListboxButton className="w-full flex justify-between items-center bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 text-gray-700 focus:ring-2 focus:ring-blue-500">
                      {selectedConsultants[item.Id]?.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedConsultants[item.Id].map((option) => (
                            <span
                              key={option.Id}
                              className="flex items-center bg-blue-500 text-white px-2 py-1 rounded-md text-sm"
                            >
                              {option.UserName}
                              <Close
                                className="ml-2 cursor-pointer w-4 h-4"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeOption(item.Id, option);
                                }}
                              />
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">
                          Select Consultant...
                        </span>
                      )}
                      <IoChevronDown className="w-5 h-5 text-gray-500" />
                    </ListboxButton>
                    <ListboxOptions className="absolute mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                      {consultantsList.map((option) => (
                        <ListboxOption
                          key={option.Id}
                          value={option}
                          className={({ active }) =>
                            `cursor-pointer select-none py-2 px-4 flex justify-between items-center ${
                              active
                                ? "bg-blue-500 text-white"
                                : "text-gray-900"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span>{option.UserName}</span>
                              {selected && (
                                <FactCheck className="w-5 h-5 text-green-500" />
                              )}
                            </>
                          )}
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>

                <button
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition flex items-center justify-center"
                  onClick={() => handleSave(item.Id)}
                  disabled={loadingId === item.Id}
                >
                  {loadingId === item.Id ? (
                    <ScaleLoader size={8} color={"#fff"} loading={true} />
                  ) : (
                    "Submit Changes"
                  )}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default ConsultantCard;
