import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://service-management-system-nine.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
