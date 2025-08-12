import React from 'react';
import { useDarkMode } from '../hooks/useDarkMode';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

export const Header: React.FC = () => {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <header className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 print:hidden">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Lumen</span>ator
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-950 focus:ring-amber-500 transition-all duration-300"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};