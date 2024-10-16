import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Users } from '../Utils/ApiUsers';

export default function ProtectAuth({ children }) {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await Users.verifyToken();
                console.log(response);
                if (response.statusCode === 200) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    navigate("/");
                }
            } catch (error) {
                setIsAuthenticated(false);
                navigate("/");
            }

            setAuthChecked(true);
        };

        if (!authChecked) {
            checkAuth();
        }
    }, [authChecked, navigate]);

    if (!authChecked) {
        return null;
    }
    return isAuthenticated ? children : null;
}
