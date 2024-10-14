import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/Navbar';
import './globals.css';

export const metadata = {
  title: 'Geography Quiz',
  description: 'Test your knowledge of world geography',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
