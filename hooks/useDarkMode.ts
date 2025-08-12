
import { useState, useEffect, useCallback } from 'react';

export const useDarkMode = (): [string, () => void] => {
  const [theme, setTheme] = useState<string>('light');

  const setMode = useCallback((mode: string) => {
    localStorage.setItem('lumenator-theme', mode);
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setTheme(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setMode(newTheme);
  }, [theme, setMode]);

  useEffect(() => {
    const localTheme = localStorage.getItem('lumenator-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (localTheme) {
      setMode(localTheme);
    } else if (prefersDark) {
      setMode('dark');
    } else {
      setMode('light');
    }
  }, [setMode]);

  return [theme, toggleTheme];
};
