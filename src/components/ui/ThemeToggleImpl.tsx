"use client";

import { useTheme } from '@/lib/context/ThemeContext';
import { Theme } from '@/lib/context/ThemeProvider';

export default function ThemeToggleImpl() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className={`
        relative overflow-hidden rounded-full p-2
        transition-all duration-300 ease-in-out
        ${theme === 'light' 
          ? 'bg-gray-100 hover:bg-gray-200 text-primary' 
          : 'bg-gray-800 hover:bg-gray-700 text-secondary'}
        transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-accent
        group
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative z-10">
        {theme === 'light' ? (
          // Moon icon for dark mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          // Sun icon for light mode
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
        )}
      </div>
      
      {/* Animated background effect */}
      <span 
        className={`
          absolute inset-0 rounded-full transform scale-0 transition-transform duration-500
          ${theme === 'light' ? 'bg-gray-800' : 'bg-gray-100'}
          group-hover:scale-100
        `}
      />
      
      {/* Tooltip */}
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-800 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </button>
  );
}
