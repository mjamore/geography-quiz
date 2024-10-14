import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import './globals.css';

export const metadata = {
  title: 'Geography Quiz',
  description: 'Test your knowledge of world geography',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="min-h-screen container mx-auto px-4 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
