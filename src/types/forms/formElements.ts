// Form elements types

export interface FormElementData {
  textInput: string;
  emailInput: string;
  passwordInput: string;
  numberInput: number;
  dateInput: string;
  timeInput: string;
  textarea: string;
  select: string;
  multiSelect: string[];
  checkbox: boolean;
  radio: string;
  switch: boolean;
  file: File | null;
}

export interface FormElementResponse {
  success: boolean;
  message: string;
  data?: FormElementData;
}

export interface BasicFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  gender: 'male' | 'female' | 'other';
  country: string;
  subscribe: boolean;
}

