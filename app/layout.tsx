import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
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
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
