'use client';

import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';
import { formatDate } from '../utils/dateUtils';

export default function ForecastItem({ data, index }) {
  const date = formatDate(data.dt);
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex flex-col items-center p-3 rounded-lg"
      style={{ 
        backgroundColor: 'var(--card-bg)',
        boxShadow: '0 2px 8px var(--card-shadow)'
      }}
    >
      <div className="text-sm font-medium">{date}</div>
      <WeatherIcon icon={icon} description={description} size={40} />
      <div className="mt-1 text-lg font-bold">{temp}°C</div>
      <div className="text-xs text-center capitalize">{description}</div>
    </motion.div>
  );
}