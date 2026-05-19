import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'gloss' | 'outline' | 'ghost';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'gloss', 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClasses = "px-8 py-4 rounded-full font-body font-bold text-sm tracking-wider uppercase transition-all duration-300 transform cursor-pointer active:scale-95 flex items-center justify-center gap-2";
  
  const variants = {
    gloss: "bg-gradient-to-r from-[#ff7a00] to-[#ffb68b] text-[#522300] hover:scale-105 shadow-[0_10px_30px_rgba(255,122,0,0.35)] hover:shadow-[0_15px_35px_rgba(255,122,0,0.5)]",
    outline: "border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:scale-105",
    ghost: "text-[#e0c0af] hover:text-[#ffb68b] hover:bg-white/5",
  };

  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
