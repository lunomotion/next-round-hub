import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = {
  title: 'Next Round Hub',
  description: 'AI-powered CRM interface for Next Round Capital',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Sidebar />
        <main className="ml-60 min-h-screen bg-white">
          {children}
        </main>
      </body>
    </html>
  );
}
