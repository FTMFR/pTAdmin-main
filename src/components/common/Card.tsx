// Common Card Component

import { ReactNode } from 'react';
import { cn } from '../ui/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  headerActions?: ReactNode;
}

export function Card({ children, className, title, description, headerActions }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-stroke dark:border-[#313D4A] bg-white dark:bg-[#24303F] shadow-sm dark:shadow-none',
        className
      )}
    >
      {(title || description || headerActions) && (
        <div className="border-b border-stroke dark:border-[#313D4A] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-[#1C2434] dark:text-white">
                  {title}
                </h3>
              )}
              {description && (
                <p className="mt-1 text-sm text-[#64748B] dark:text-[#8A99AF]">
                  {description}
                </p>
              )}
            </div>
            {headerActions && <div>{headerActions}</div>}
          </div>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

