import React from 'react';

export function Footer() {
  return (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex flex-col justify-center text-center text-xs bg-blue-300">
      <p>
          Created by{' '}
        <a
          className="font-bold hover:underline"
          href="https://euphoria.software"
          rel="noreferrer"
          target="_blank"
        >
          Euphoria Software
        </a>
      </p>
      <p className="text-lg">✌️ ❤️</p>
    </footer>
  );
}
