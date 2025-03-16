import { apiClient } from "./apiClient";

export const ClientApi = {
  getAll: async (page, limit, search) => {
    try {
      const response = await apiClient.get("/api/v.01/clients/getAll", {
        params: {
          page,
          limit,
          search,
        },
      });
      return response.data;
    } catch (error) {
      return error.response ? error.response.data : error;
    }
  },

  create: async (formAdd) => {
    try {
      const response = await apiClient.post(
        `/api/v.01/clients/client-add`,
        formAdd
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  getByid: async (id) => {
    try {
      const response = await apiClient.get(
        `/api/v.01/clients/clientById/${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  updateClient: async (id, formEdit) => {
    try {
      const response = await apiClient.put(
        `/api/v.01/clients/client-update/${id}`,
        formEdit
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },

  deleteClient: async (id) => {
    try {
      const response = await apiClient.delete(
        `/api/v.01/clients/client-delete/${id}`
      );
      return response.data;
    } catch (error) {
      throw error.response ? error.response.data : error;
    }
  },
};
