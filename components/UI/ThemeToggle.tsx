'use client';

import { useTheme } from '../../src/app/context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full transition-colors
        ${theme === 'dark' ? 'bg-purple-600' : 'bg-gray-300'}
        focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
      `}
      aria-label={`Passer en mode ${theme === 'dark' ? 'clair' : 'sombre'}`}
    >
      <span className="sr-only">
        {theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
      </span>
      
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white transition-transform
          ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
      
      {/* Icônes */}
      <div className="absolute inset-y-0 left-0 flex items-center justify-center w-full">
        <span
          className={`
            text-xs transition-opacity
            ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}
          `}
        >
          ☀️
        </span>
        <span
          className={`
            text-xs transition-opacity absolute
            ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}
          `}
        >
          🌙
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;