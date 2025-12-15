// Auth Layout for login/signup pages

import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return <div dir="rtl">{children}</div>;
}

