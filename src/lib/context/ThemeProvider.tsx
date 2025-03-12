"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// Define the theme type
export type Theme = 'light' | 'dark';

// Define the context type
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isInitialized: boolean;
}

// Create the context with default values
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  isInitialized: false,
});

// Export a hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

// The actual implementation that will be dynamically imported
export function ThemeProviderImpl({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [isInitialized, setIsInitialized] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage and system preferences
  useEffect(() => {
    try {
      // Check for saved theme in localStorage
      const savedTheme = localStorage.getItem('theme') as Theme;
      // Check system preference for dark mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      // Set theme based on saved preference or system preference
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      } else if (prefersDark) {
        setTheme('dark');
      }

      // Mark as initialized after first render
      setIsInitialized(true);
      setMounted(true);
    } catch (error) {
      console.error('Error initializing theme:', error);
      // Ensure we still mark as initialized even if there's an error
      setIsInitialized(true);
      setMounted(true);
    }
  }, []);

  // Update document class and localStorage when theme changes
  useEffect(() => {
    if (!isInitialized) return;

    try {
      // Save theme to localStorage
      localStorage.setItem('theme', theme);

      // Update document class for Tailwind dark mode
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [theme, isInitialized]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  // Avoid hydration errors by not rendering theme-specific content before mounting
  if (!mounted) {
    return <>{children}</>;
  }

  // Provide the theme context to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isInitialized }}>
      {children}
    </ThemeContext.Provider>
  );
}
