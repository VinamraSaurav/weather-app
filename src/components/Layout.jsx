'use client';

import { motion } from 'framer-motion';
import { WeatherProvider } from '../context/WeatherContext';

export default function Layout({ children }) {
  return (
    <WeatherProvider>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen transition-colors duration-300"
      >
        {children}
      </motion.div>
    </WeatherProvider>
  );
}