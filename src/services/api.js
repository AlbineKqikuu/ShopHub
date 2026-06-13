import axios from 'axios';

const api = axios.create({
    baseURL: 'https://fakestoreapi.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const customError = {
            message: error.response?.data?.message || error.message || 'Something went wrong',
            status: error.response?.status,
        };
        return Promise.reject(customError);
    }
);

export default api;
