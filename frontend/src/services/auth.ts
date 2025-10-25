import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'seller' | 'customer';
}

export const authService = {
    login: async (data: LoginRequest) => {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
        return response.data;
    },

    register: async (data: RegisterRequest) => {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
        return response.data;
    }
};