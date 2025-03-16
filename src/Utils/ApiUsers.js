import { apiClient } from "./apiClient";

export const login = {
  loginPost: async (formLogin) => {
    try {
      const response = await apiClient.post("/api/v.01/auth/login", formLogin);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  AuthProtect: async () => {
    try {
      const response = await apiClient.get("/api/v.01/protected");
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },

  getAllUsers: async (page, limit, role, search) => {
    try {
      const response = await apiClient.get("/api/v.01/auth/users/get-all", {
        params: {
          page,
          limit,
          role,
          search,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getConsultant: async () => {
    try {
      const response = await apiClient.get(
        "/api/v.01/auth/users/get-consultants"
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  logout: async () => {
    try {
      const response = await apiClient.get("/api/v.01/auth/logout");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
export const getUserById = {
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/v.01/auth/getUsersById`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  getMenus: async () => {
    try {
      const response = await apiClient.get("/api/v.01/menu/get-all");
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
