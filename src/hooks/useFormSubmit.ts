// Form submit hook

import { useState } from 'react';
import { LoadingState } from '../types/api/common';

interface UseFormSubmitOptions<T> {
  onSubmit: (data: T) => Promise<any>;
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

export function useFormSubmit<T>(options: UseFormSubmitOptions<T>) {
  const { onSubmit, onSuccess, onError } = options;
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  const submit = async (data: T) => {
    setLoading('loading');
    setError(null);
    try {
      const response = await onSubmit(data);
      if (response.success) {
        setLoading('success');
        onSuccess?.(response);
        return response;
      } else {
        throw new Error(response.message || 'خطا در ارسال فرم');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'خطا در ارسال فرم';
      setError(errorMessage);
      setLoading('error');
      onError?.(err);
      throw err;
    }
  };

  return {
    submit,
    loading,
    error,
  };
}

