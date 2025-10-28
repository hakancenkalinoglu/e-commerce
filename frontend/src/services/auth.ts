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

// Token saklama ve alma fonksiyonları
export const tokenService = {
    setToken: (token: string) => {
        localStorage.setItem('authToken', token);
    },
    getToken: (): string | null => {
        return localStorage.getItem('authToken');
    },
    removeToken: () => {
        localStorage.removeItem('authToken');
    }
};

// Axios instance oluştur - otomatik token ekleme için
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

// Request interceptor - Her istekte token'ı header'a ekle
axiosInstance.interceptors.request.use(
    (config) => {
        const token = tokenService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Token geçersizse logout
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            tokenService.removeToken();
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authService = {
    login: async (data: LoginRequest) => {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
        
        // Token'ı localStorage'a kaydet
        if (response.data.token) {
            tokenService.setToken(response.data.token);
        }
        
        return response.data;
    },

    register: async (data: RegisterRequest) => {
        const response = await axios.post(`${API_BASE_URL}/auth/register`, data);
        return response.data;
    }
};

// axiosInstance'i export et - tüm API çağrılarında kullan
export { axiosInstance };