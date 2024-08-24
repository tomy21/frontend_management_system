import { apiClient } from "./apiClient";

export const login = {
    loginPost: async (formLogin) => {
        try {
            const response = await apiClient.post(
                "/api/auth/login",
                formLogin
            );
            // console.log("response", response);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
}
export const getUserById = {
    getById: async (id) => {
        try {
            const response = await apiClient.get(
                `/api/auth/getUsers/${id}`,
            );
            console.log("response", response.data);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },
}