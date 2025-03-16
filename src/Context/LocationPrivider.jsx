import React, { createContext, useContext, useEffect, useState } from "react";
import { LocationApi } from "../Utils/LocationApi";

const LocationContext = createContext();

export default function LocationProvider({ children }) {
  const [locationData, setLocationData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchServiceType = async () => {
      try {
        const response = await LocationApi.getAll(page, limit, search);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
        setLocationData(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchServiceType();
  }, [page, limit, search]);

  const reloadLocationApi = async () => {
    try {
      const response = await LocationApi.getAll(page, limit, search);
      setLocationData(response.data); // Memperbarui state dengan data terbaru
    } catch (error) {
      alert("Failed to reload service types.");
    }
  };
  return (
    <LocationContext.Provider
      value={{
        locationData,
        page,
        limit,
        totalPages,
        totalItems,
        setPage,
        setLimit,
        setSearch,
        reloadLocationApi,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export const useLocationProvider = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error(
      "useLocationProvider must be used within a LocationProvider"
    );
  }

  return context;
};
