// Forms API

import apiClient from './client';
import { ApiResponse } from '../types/api/common';
import { FormElementData, FormElementResponse, BasicFormData } from '../../types/forms/formElements';
import { AdvancedFormData, AdvancedFormResponse } from '../../types/forms/advancedForm';
import { mockFormsApi } from '../mock/mockData';

export const formsApi = {
  // Submit basic form
  submitBasicForm: mockFormsApi.submitBasicForm,
  // Submit form elements
  submitFormElements: async (data: FormElementData): Promise<ApiResponse<FormElementResponse>> => {
    const formData = new FormData();
    
    // Append all form fields
    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        value.forEach((item) => formData.append(`${key}[]`, item));
      } else {
        formData.append(key, String(value));
      }
    });

    const response = await apiClient.post<ApiResponse<FormElementResponse>>('/forms/elements', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Submit advanced form
  submitAdvancedForm: async (data: AdvancedFormData): Promise<ApiResponse<AdvancedFormResponse>> => {
    const formData = new FormData();
    
    // Append personal info
    Object.entries(data.personalInfo).forEach(([key, value]) => {
      formData.append(`personalInfo[${key}]`, String(value));
    });

    // Append address
    Object.entries(data.address).forEach(([key, value]) => {
      formData.append(`address[${key}]`, String(value));
    });

    // Append preferences
    Object.entries(data.preferences).forEach(([key, value]) => {
      formData.append(`preferences[${key}]`, String(value));
    });

    // Append documents
    data.documents.forEach((file, index) => {
      formData.append(`documents[${index}]`, file);
    });

    formData.append('terms', String(data.terms));

    const response = await apiClient.post<ApiResponse<AdvancedFormResponse>>('/forms/advanced', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

