import React, { createContext, useContext, useEffect, useState } from "react";
import { OrdersApi } from "../Utils/OrderApi";

const OrderContext = createContext();

export default function ServiceOrderProvider({ children }) {
  const [dataOrder, setDataOrder] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await OrdersApi.getAll(page, limit, search);
        setDataOrder(response.data);
        setTotalItems(response.totalItems);
        setTotalPages(response.totalPages);
      } catch (error) {}
    };

    fetchOrder();
  }, [page, limit, search]);

  const reloadDataOrder = async () => {
    try {
      const response = await OrdersApi.getAll(page, limit, search);
      setDataOrder(response.data);
    } catch (error) {
      alert("Failed to reload service types.");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        dataOrder,
        page,
        limit,
        totalPages,
        totalItems,
        setPage,
        setLimit,
        setSearch,
        reloadDataOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrderProvider = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrderProvider must be used within a OrderProvider");
  }

  return context;
};
