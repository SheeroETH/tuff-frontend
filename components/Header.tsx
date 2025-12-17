import React from 'react';
import { Button } from './Button';

interface HeaderProps {
  onGeneratorClick: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-5 bg-gradient-to-b from-black/90 to-transparent backdrop-blur-[2px]">
      <div className="flex items-center gap-2">
        <a href="https://iztuff.fun/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
          <img src="/tuff logo ecr.png" alt="TUFF Logo" className="h-8 md:h-10 object-contain" />
        </a>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <a href="https://iztuff.fun/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
          <img src="/logo tuff.png" alt="TUFF Icon" className="h-12 w-auto object-contain" />
        </a>
      </div>

      <nav className="hidden md:flex items-center gap-8">
      </nav>

      <div>
      </div>
    </header>
  );
};