import React, { createContext, useContext, useEffect, useState } from "react";
import { ServiceTypeApi } from "../Utils/ServiceTypeApi";

const ServiceContext = createContext();

export default function ServiceTypeProvider({ children }) {
  const [serviceType, setServiceType] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchServiceType = async () => {
      try {
        const response = await ServiceTypeApi.getAllServiceType(
          page,
          limit,
          search
        );
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
        setServiceType(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchServiceType();
  }, [page, limit, search]);

  // Fungsi untuk memuat ulang data setelah berhasil menambah service type
  const reloadServiceTypes = async () => {
    try {
      const response = await ServiceTypeApi.getAllServiceType(
        page,
        limit,
        search
      );
      setServiceType(response.data); // Memperbarui state dengan data terbaru
    } catch (error) {
      alert("Failed to reload service types.");
    }
  };

  return (
    <ServiceContext.Provider
      value={{
        serviceType,
        page,
        limit,
        totalPages,
        totalItems,
        setPage,
        setLimit,
        setSearch,
        reloadServiceTypes,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export const useServiceType = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error("useServiceType must be used within a ServiceTypeProvider");
  }

  return context;
};
