import axios from 'axios';

const apiService = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiService;
