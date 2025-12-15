// Authentication API

import apiClient from './client';
import { ApiResponse } from '../types/api/common';
import { LoginRequest, SignupRequest, AuthResponse, User } from '../../types/api/auth';
import { USE_MOCK_DATA, mockApi } from '../mock/mockData';

export const authApi = {
  // Login
  login: async (data: LoginRequest): Promise<ApiResponse<AuthResponse>> => {
    if (USE_MOCK_DATA) {
      return await mockApi.login(data.email, data.password);
    }
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data;
  },

  // Signup
  signup: async (data: SignupRequest): Promise<ApiResponse<AuthResponse>> => {
    if (USE_MOCK_DATA) {
      return await mockApi.signup(data);
    }
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<ApiResponse<void>> => {
    if (USE_MOCK_DATA) {
      return { success: true, data: undefined };
    }
    const response = await apiClient.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    if (USE_MOCK_DATA) {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        return { success: true, data: JSON.parse(userStr) };
      }
      throw { message: 'کاربر یافت نشد', statusCode: 401 };
    }
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<ApiResponse<{ token: string }>> => {
    if (USE_MOCK_DATA) {
      return { success: true, data: { token: 'mock_token_' + Date.now() } };
    }
    const response = await apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh', {
      refreshToken,
    });
    return response.data;
  },
};

