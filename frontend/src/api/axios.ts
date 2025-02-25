import axios from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Importante para enviar cookies nas requisições
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;