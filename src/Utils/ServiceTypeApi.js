import { apiClient } from "./apiClient";

export const ServiceTypeApi = {
  getAllServiceType: async (page, limit, search) => {
    try {
      const response = await apiClient.get("/api/v.01/serviceType/getAll", {
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
  createServiceType: async (formData) => {
    try {
      const response = await apiClient.post(
        "/api/v.01/serviceType/add",
        formData
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  getServiceTypeById: async (id) => {
    try {
      const response = await apiClient.get(
        `/api/v.01/serviceType/getByid/${id}`
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  updateServiceType: async (id, formdata) => {
    try {
      const response = await apiClient.put(
        `/api/v.01/serviceType/update/${id}`,
        formdata
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  deleteServiceType: async (id) => {
    try {
      const response = await apiClient.delete(
        `/api/v.01/serviceType/delete/${id}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
};
