import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClientThemeProvider } from '@/components/ClientThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MicroQuest',
  description: 'Transform your spare time into a spontaneous, hyper-local adventure',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`} suppressHydrationWarning>
        <ClientThemeProvider>
          <main className="min-h-screen">
            {children}
          </main>
        </ClientThemeProvider>
      </body>
    </html>
  );
}
