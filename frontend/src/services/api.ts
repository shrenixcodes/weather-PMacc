import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const weatherService = {
  getWeather: async (query: string) => {
    const response = await apiClient.get(`/weather?q=${query}`);
    return response.data;
  },
};

export const historyService = {
  getHistories: async () => {
    const response = await apiClient.get('/history');
    return response.data;
  },
  createHistory: async (data: any) => {
    const response = await apiClient.post('/history', data);
    return response.data;
  },
  updateHistory: async (id: number, data: any) => {
    const response = await apiClient.put(`/history/${id}`, data);
    return response.data;
  },
  deleteHistory: async (id: number) => {
    await apiClient.delete(`/history/${id}`);
  },
};
