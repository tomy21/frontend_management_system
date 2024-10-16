import { apiClient } from './apiClient'

export const login = {
  loginPost: async (formLogin) => {
    try {
      const response = await apiClient.post('/api/auth/login', formLogin)
      // console.log("response", response);
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },

  logoutPost: async () => {
    try {
      const response = await apiClient.post('/api/auth/logout')
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },
}

export const Users = {
  addUsers: async (formData) => {
    try {
      const response = await apiClient.post(`/api/users`, formData)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },

  verifyToken: async () => {
    try {
      const response = await apiClient.get('/api/auth/verifyToken')
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },

  getUsers: async (page, limit, role, search) => {
    try {
      if (!page || !limit) {
        throw new Error('page and limit are required')
      }
      if (role === null || role === undefined) {
        throw new Error('role should not be null or undefined')
      }
      if (search === null || search === undefined) {
        throw new Error('search should not be null or undefined')
      }
      const response = await apiClient.get(`/api/users`, {
        params: { page, limit, role, search },
      })
      return response.data
    } catch (error) {
      if (error.response && error.response.data) {
        throw error.response.data
      } else {
        throw error
      }
    }
  },

  getById: async () => {
    try {
      const response = await apiClient.get(`/api/auth/getUsersById`)
      console.log('response', response.data)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },

  editUsers: async (id, formData) => {
    try {
      const response = await apiClient.put(`/api/users/${id}`, formData)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },

  deleteUsers: async (id) => {
    try {
      const response = await apiClient.delete(`/api/users/${id}`)
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },
}

export const AttendanceUsers = {
  getAttendance: async () => {
    try {
      const response = await apiClient.get(`/api/attendance/byIdUser`)
      return response
    } catch (error) {
      throw error.response.data
    }
  },
  checkIn: async (Longitude, Latitude, InDate) => {
    try {
      const response = await apiClient.post(`/api/attendance`, {
        Longitude,
        Latitude,
        InDate,
        CreatedBy: 'system',
      })
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },

  checkOut: async (id) => {
    try {
      const response = await apiClient.post(`/api/attendance/checkout/${id}`, {
        Status: 'Check Out',
        CreatedBy: 'system',
      })
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },
}
