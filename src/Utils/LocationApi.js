import { apiClient } from "./apiClient";

export const LocationApi = {
  getAll: async (page, limit, search) => {
    try {
      const response = await apiClient.get("/api/v.01/master-location/getAll", {
        params: {
          page,
          limit,
          search,
        },
      });

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/v.01/master-location/${id}`);

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  create: async (formData) => {
    try {
      const response = await apiClient.post(
        `/api/v.01/master-location`,
        formData
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  update: async (id, formData) => {
    try {
      const response = await apiClient.put(
        `/api/v.01/master-location/${id}`,
        formData
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  delete: async (id) => {
    try {
      const response = await apiClient.delete(
        `/api/v.01/master-location/delete/${id}`
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};
