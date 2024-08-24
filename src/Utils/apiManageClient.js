import { apiClient } from "./apiClient";

export const getAllClient = {
    getAll: async (page = 1, limit = 10, searchTerm = '') => {
        try {
            const response = await apiClient.get("/api/clients", {
                params: {
                    page,
                    limit,
                    searchTerm: searchTerm || undefined,
                },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    },
};

export const createClient = {
    create: async (formAdd) => {
        try {
            const response = await apiClient.post(`/api/clients`, formAdd);
            console.log(response);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
}

export const getById = {
    getByid: async(id) => {
        try {
            const response = await apiClient.get(`/api/clients/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
}
export const updateClient = {
    updateClient: async(id, formEdit) => {
        try {
            const response = await apiClient.put(`/api/clients/${id}`, formEdit);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
}
export const deleteClient = {
    deleteClient: async(id) => {
        try {
            const response = await apiClient.delete(`/api/clients/${id}`);
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error;
        }
    }
}