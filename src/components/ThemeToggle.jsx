import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check initial state
    if (localStorage.theme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-8 right-8 z-50 flex items-center justify-center gap-3 group cursor-crosshair mix-blend-difference"
      aria-label="Toggle Theme"
    >
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.4em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {isDark ? 'Ignite' : 'Extinguish'}
      </span>
      <div 
        className="w-3.5 h-3.5 rounded-full border-[1.5px] border-white relative overflow-hidden transition-transform duration-[1.5s] ease-[cubic-bezier(0.87,0,0.13,1)]"
        style={{ transform: isDark ? 'rotate(180deg)' : 'rotate(0deg)' }}
      >
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white"></div>
      </div>
    </button>
  );
}
