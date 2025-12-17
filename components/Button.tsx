import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "font-black uppercase tracking-wide py-3 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base";

  const variants = {
    primary: "bg-gradient-to-b from-white to-gray-300 text-black border border-white/50 hover:from-gray-100 hover:to-gray-400 shadow-[0_0_20px_rgba(255,255,255,0.2)]",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    outline: "border-2 border-white text-white hover:bg-white hover:text-black",
    ghost: "text-white/70 hover:text-white"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
