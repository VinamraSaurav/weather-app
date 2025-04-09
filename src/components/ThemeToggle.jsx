'use client';

import { useWeather } from '../context/WeatherContext';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useWeather();
  
  const getIcon = () => {
    switch (theme) {
      case 'light': return <FiSun size={18} />;
      case 'dark': return <FiMoon size={18} />;
      default: return <FiMonitor size={18} />;
    }
  };
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="p-2 rounded-full bg-opacity-20 hover:bg-opacity-30 transition-all"
      style={{ backgroundColor: 'var(--card-bg)' }}
      aria-label="Toggle theme"
    >
      {getIcon()}
    </motion.button>
  );
}