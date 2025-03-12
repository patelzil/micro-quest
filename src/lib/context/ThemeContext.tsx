"use client";

import { ReactNode } from 'react';
import dynamic from 'next/dynamic';

// Import the types directly from the ThemeProvider file
import type { Theme, ThemeContextType } from '@/lib/context/ThemeProvider';
import { useThemeContext } from '@/lib/context/ThemeProvider';

// Use dynamic import with the correct path
const ThemeProviderImpl = dynamic(
  () => import('@/lib/context/ThemeProvider').then(mod => mod.ThemeProviderImpl), 
  { ssr: false }
);

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeProviderImpl>{children}</ThemeProviderImpl>;
}

export function useTheme(): ThemeContextType {
  return useThemeContext();
}

export type { Theme };
