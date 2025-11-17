import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  href, 
  children, 
  onClick, 
  className = '', 
  type = 'button',
  disabled = false
}) => {
  const baseClasses = "inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none";
  
  if (href && !disabled) {
    return (
      <Link href={href} className={`${baseClasses} ${className}`}>
        {children}
      </Link>
    );
  }
  
  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;