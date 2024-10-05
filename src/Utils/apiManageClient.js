import { apiClient } from './apiClient'

export const clientData = {
  getAll: async (page = 1, limit = 10, searchTerm = '') => {
    try {
      const response = await apiClient.get('/api/clients/getAll', {
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
        },
      })
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  create: async (formAdd) => {
    if (!formAdd) {
      throw new Error('formAdd is null or undefined')
    }
    try {
      const response = await apiClient.post(`/api/clients/client-add`, formAdd)
      if (!response || !response.data) {
        throw new Error('No response or response data from server')
      }
      return response.data
    } catch (error) {
      if (error.response) {
        throw error.response.data
      } else {
        throw error
      }
    }
  },

  getByid: async (id) => {
    try {
      const response = await apiClient.get(`/api/clients/clientById/${id}`)
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  updateClient: async (id, formEdit) => {
    try {
      const response = await apiClient.put(
        `/api/clients/client-update/${id}`,
        formEdit,
      )
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  deleteClient: async (id) => {
    try {
      const response = await apiClient.delete(
        `/api/clients/client-delete/${id}`,
        {
          data: { DeletedBy: 'Admin' },
        },
      )
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },
}

export const serviceType = {
  getAll: async (page = 1, limit = 10, searchTerm = '') => {
    try {
      const response = await apiClient.get('/api/serviceType/getAll', {
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
        },
      })
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/serviceType/getByid/${id}`)
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  create: async (formData) => {
    if (!formData) {
      throw new Error('formAdd is null or undefined')
    }
    try {
      const response = await apiClient.post('/api/serviceType/add')
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  update: async (id, formData) => {
    if (!formData) {
      throw new Error('formAdd is null or undefined')
    }
    try {
      const response = await apiClient.put(
        `/api/serviceType/update/${id}`,
        formData,
      )
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  deleteClient: async (id) => {
    try {
      const response = await apiClient.delete(`/api/serviceType/delete/${id}`, {
        data: { DeletedBy: 'Admin' },
      })
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },
}

export const serviceOrders = {
  getAll: async (page, limit, searchTerm = '', status) => {
    try {
      const response = await apiClient.get('/api/serviceOrder/getAll', {
        params: {
          page,
          limit,
          searchTerm: searchTerm || undefined,
          status,
        },
      })
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/api/serviceOrder/getById/${id}`)
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  getByOrderId: async (id) => {
    try {
      const response = await apiClient.get(
        `/api/service-order-consultant/get/${id}`,
      )
      return response
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  getByConsultantId: async () => {
    try {
      const response = await apiClient.get(
        `/api/service-order-consultant/getByConsultant`,
      )
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  postData: async (formData) => {
    try {
      const response = await apiClient.post('/api/serviceOrder/add', formData)
      console.log(response)
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  updateDataConsultant: async (id, data) => {
    try {
      const response = await apiClient.put(
        `/api/service-order-consultant/update-data/${id}`,
        data,
      )
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },

  updateServiceOrder: async (id, data) => {
    try {
      const response = await apiClient.put(
        `/api/serviceOrder/update/${id}`,
        data,
      )
      return response.data
    } catch (error) {
      throw error.response ? error.response.data : error
    }
  },
}
