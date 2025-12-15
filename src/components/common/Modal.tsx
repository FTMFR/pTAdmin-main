// Common Modal Component

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { cn } from '../ui/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className,
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(
          'bg-white dark:bg-[#24303F] border-stroke dark:border-[#313D4A]',
          sizeClasses[size],
          className
        )}
        dir="rtl"
      >
        {(title || description) && (
          <DialogHeader>
            {title && (
              <DialogTitle className="text-[#1C2434] dark:text-white">
                {title}
              </DialogTitle>
            )}
            {description && (
              <DialogDescription className="text-[#64748B] dark:text-[#8A99AF]">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
}

