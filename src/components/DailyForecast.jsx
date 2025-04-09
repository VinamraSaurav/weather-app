'use client';

import { motion } from 'framer-motion';
import ForecastItem from './ForecastItem';
import { groupForecastByDay } from '../utils/dateUtils';

export default function DailyForecast({ data }) {
  if (!data) return null;
  
  const dailyForecast = groupForecastByDay(data.list);
  
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl p-6"
      style={{ 
        backgroundColor: 'var(--card-bg)',
        boxShadow: '0 4px 12px var(--card-shadow)'
      }}
    >
      <h3 className="text-xl font-bold mb-4">Forecast</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {dailyForecast.map((day, index) => (
          <ForecastItem key={day.dt} data={day} index={index} />
        ))}
      </div>
    </motion.div>
  );
}