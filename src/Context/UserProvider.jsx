import React, { createContext, useContext, useEffect, useState } from "react";
import { getUserById } from "../Utils/ApiUsers.js";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        const response = await getUserById.getById();
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };

    if (!user) {
      fetchDataUser();
    }
  }, [user]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
