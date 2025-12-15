// Common Input Component

import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../ui/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-2 block text-sm font-medium text-[#1C2434] dark:text-white">
            {label}
            {props.required && <span className="text-red-500 mr-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-md border bg-transparent px-4 py-3 text-sm text-[#1C2434] dark:text-white outline-none transition',
            'border-stroke dark:border-[#313D4A]',
            'focus:border-[#3C50E0] focus:ring-2 focus:ring-[#3C50E0]/20',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error || helperText ? `${props.id}-help` : undefined}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-500" id={`${props.id}-help`}>
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-sm text-[#64748B] dark:text-[#8A99AF]" id={`${props.id}-help`}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

