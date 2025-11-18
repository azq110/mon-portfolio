'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '../../src/app/context/ThemeContext';
import ThemeToggle from '../UI/ThemeToggle';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { href: '#hero', label: 'Accueil' },
    { href: '#about', label: 'À propos' },
    { href: '#projects', label: 'Projets' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`
      fixed top-0 left-0 w-full z-50 py-6 transition-all duration-300
      ${isScrolled 
        ? `py-4 backdrop-blur-md shadow-lg ${theme === 'dark' ? 'bg-dark/80' : 'bg-white/80'}` 
        : 'bg-transparent'
      }
    `}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-gradient">
          Portfolio
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`
                    font-medium transition-colors duration-300 relative py-2
                    ${theme === 'dark' 
                      ? 'text-light hover:text-purple-400' 
                      : 'text-gray-800 hover:text-purple-600'
                    }
                  `}
                >
                  {link.label}
                  <span className={`
                    absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 hover:w-full
                    ${theme === 'dark' 
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500' 
                      : 'bg-gradient-to-r from-purple-600 to-cyan-500'
                    }
                  `}></span>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* Theme Toggle */}
          <div className="flex items-center space-x-2 pl-4 border-l border-gray-300 dark:border-gray-600">
            <span className={`
              text-sm
              ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            `}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button 
            className={`
              z-50
              ${theme === 'dark' ? 'text-light' : 'text-gray-800'}
            `}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`
          fixed top-0 right-0 h-screen w-2/4 backdrop-blur-lg bg-black/65  transform transition-transform duration-300 md:hidden z-40
          ${theme === 'dark' ? 'bg-darker/95' : 'bg-white/95'}
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <ul className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link 
                  href={link.href} 
                  className={`
                    text-xl font-medium transition-colors duration-300
                    ${theme === 'dark' 
                      ? 'text-light hover:text-purple-400' 
                      : 'text-gray-800 hover:text-purple-600'
                    }
                  `}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;