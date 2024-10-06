import axios from 'axios'

export const apiClient = axios.create({
  // baseURL: 'http://localhost:3008',
  baseURL: 'https://service-management-system-nine.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
