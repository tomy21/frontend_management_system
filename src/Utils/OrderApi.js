import { apiClient } from "./apiClient";

export const OrdersApi = {
  getAll: async (page, limit, search) => {
    try {
      const response = await apiClient.get("/api/v.01/serviceOrder/getAll", {
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
      const response = await apiClient.get(
        `/api/v.01/serviceOrder/getById/${id}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  create: async (formData) => {
    try {
      const response = await apiClient.post(
        `/api/v.01/serviceOrder/add`,
        formData
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
  update: async () => {},
  delete: async () => {},
};

export const AssignApi = {
  assignConsultant: async (id, ConsultantId) => {
    try {
      const response = await apiClient.put(
        `/api/v.01/service-order-consultant/update-data/${id}`,
        {
          ConsultantIds: ConsultantId,
        }
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
