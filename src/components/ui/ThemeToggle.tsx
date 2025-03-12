"use client";

import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled to prevent hydration errors
const ThemeToggleImpl = dynamic(() => import('./ThemeToggleImpl'), { 
  ssr: false,
  // Show nothing during loading to prevent hydration mismatch
  loading: () => <div className="w-10 h-10 opacity-0"></div>
});

export default function ThemeToggle() {
  return <ThemeToggleImpl />;
}
