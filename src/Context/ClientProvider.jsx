import React, { createContext, useContext, useEffect, useState } from "react";
import { ClientApi } from "../Utils/apiManageClient";

const ClientContext = createContext();

export default function ClientProvider({ children }) {
  const [clientData, setClientData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalActive, setTotalActive] = useState(0);
  const [totalInActive, setTotalInActive] = useState(0);

  useEffect(() => {
    const fetchServiceType = async () => {
      try {
        const response = await ClientApi.getAll(page, limit, search);
        setTotalInActive(response.totalInactiveClients || 0);
        setTotalActive(response.totalActiveClients || 0);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
        setClientData(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchServiceType();
  }, [page, limit, search]);

  const reloadClientApi = async () => {
    try {
      const response = await ClientApi.getAll(page, limit, search);
      setClientData(response.data);
      setTotalInActive(response.totalInactiveClients || 0);
      setTotalActive(response.totalActiveClients || 0);
    } catch (error) {
      alert("Failed to reload service types.");
    }
  };
  return (
    <ClientContext.Provider
      value={{
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
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}

export const useClientProvider = () => {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClientProvider must be used within a ClientProvider");
  }

  return context;
};
