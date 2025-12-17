import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-8 bg-black border-t border-white/10 text-center text-white/30 text-xs uppercase font-bold tracking-widest">
      <p>&copy; {new Date().getFullYear()} TUFF. All rights reserved.</p>
    </footer>
  );
};
