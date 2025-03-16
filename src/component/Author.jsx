import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../Utils/ApiUsers";

export default function Author({ children }) {
  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuthFailure = useCallback(
    (message, status) => {
      setIsAuthenticated(false);
      setMessage(message);
      setStatus(status);
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/");
      }, 2000);
    },
    [navigate]
  );

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await login.AuthProtect();
        if (response.status === "success") {
          setIsAuthenticated(true);
        } else {
          handleAuthFailure(response.message, response.status);
        }
      } catch (error) {
        handleAuthFailure(
          error.response.data.message,
          error.response.data.status
        );
      }

      setAuthChecked(true);
    };

    if (!authChecked) {
      checkAuth();
    }
  }, [handleAuthFailure, authChecked, navigate]);

  if (!authChecked) return null;

  return isAuthenticated ? (
    children
  ) : (
    <>
      {isModalOpen && (
        <div
          className={`fixed top-10 right-0 m-5 p-4 rounded-lg shadow-lg bg-white transition-transform transform border border-gray-300 ${
            isModalOpen
              ? "translate-y-0 opacity-100"
              : "-translate-y-full opacity-0"
          } ${status === "success" ? "text-green-500" : " text-red-500"}`}
          style={{ transition: "transform 0.5s, opacity 0.5s" }}
        >
          <p className="font-semibold text-xl uppercase text-start">{status}</p>
          <p className="font-normal text-gray-400 text-start">{message}</p>
        </div>
      )}
    </>
  );
}
