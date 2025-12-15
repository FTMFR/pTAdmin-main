// Settings API

import apiClient from './client';
import { ApiResponse } from '../types/api/common';

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
  };
}

export const settingsApi = {
  // Get user settings
  getSettings: async (): Promise<ApiResponse<UserSettings>> => {
    const response = await apiClient.get<ApiResponse<UserSettings>>('/settings');
    return response.data;
  },

  // Update user settings
  updateSettings: async (data: Partial<UserSettings>): Promise<ApiResponse<UserSettings>> => {
    const response = await apiClient.put<ApiResponse<UserSettings>>('/settings', data);
    return response.data;
  },
};

