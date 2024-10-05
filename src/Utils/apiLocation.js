import { apiClient } from './apiClient'

export const ApiLocation = {
  getAll: async (page, limit, search) => {
    try {
      const response = await apiClient.get('/api/master-location/getAll')
      // console.log("response", response);
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },

  deleteLocation: async (id) => {
    try {
      const response = await apiClient.delete(
        `/api//master-location/delete/${id}`,
      )
      return response.data
    } catch (error) {
      throw error.response.data
    }
  },
}
