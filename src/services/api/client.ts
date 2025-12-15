// API Client with Axios

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse, ErrorResponse } from '../../types/api/common';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      const errorResponse: ErrorResponse = {
        message: error.response.data?.message || 'خطایی رخ داد',
        errors: error.response.data?.errors,
        statusCode: error.response.status,
      };

      // Handle 401 Unauthorized - Clear token and redirect to login
      if (error.response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.location.href = '/auth/login';
      }

      return Promise.reject(errorResponse);
    } else if (error.request) {
      // Request made but no response received
      return Promise.reject({
        message: 'خطا در ارتباط با سرور',
      } as ErrorResponse);
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || 'خطای ناشناخته',
      } as ErrorResponse);
    }
  }
);

export default apiClient;

