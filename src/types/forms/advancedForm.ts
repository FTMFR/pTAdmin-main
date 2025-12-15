// Advanced form types

export interface AdvancedFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
  };
  address: {
    country: string;
    city: string;
    street: string;
    postalCode: string;
  };
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    language: string;
    timezone: string;
  };
  documents: File[];
  terms: boolean;
}

export interface AdvancedFormResponse {
  success: boolean;
  message: string;
  data?: AdvancedFormData;
}

