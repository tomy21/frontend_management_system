import axios from 'axios'

export const apiClient = axios.create({
  baseURL:
    'https://service-management-system-2buj63496-tomy21s-projects.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
