// Common Button Component

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../ui/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantClasses = {
    primary: 'bg-[#3C50E0] text-white hover:bg-[#3C50E0]/90 focus:ring-[#3C50E0]',
    secondary: 'bg-gray-100 dark:bg-[#313D4A] text-[#1C2434] dark:text-white hover:bg-gray-200 dark:hover:bg-[#404D5E]',
    outline: 'border border-stroke dark:border-[#313D4A] bg-transparent text-[#1C2434] dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]',
    ghost: 'bg-transparent text-[#1C2434] dark:text-white hover:bg-gray-100 dark:hover:bg-[#313D4A]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeClasses = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          <span>در حال پردازش...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

