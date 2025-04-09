'use client';

import { motion } from 'framer-motion';
import { FiDroplet, FiSun, FiWind } from 'react-icons/fi';
import WeatherIcon from './WeatherIcon';
import { formatTime } from '../utils/dateUtils';
import { TbSunset2 } from 'react-icons/tb';

export default function CurrentWeather({ data }) {
  if (!data) return null;

  const { 
    name, 
    main: { temp, humidity, feels_like }, 
    weather, 
    wind, 
    sys: { sunrise, sunset, country }
  } = data;
  
  const weatherCondition = weather[0].main;
  const description = weather[0].description;
  const icon = weather[0].icon;
  
  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl p-6 mb-6"
      style={{ 
        backgroundColor: 'var(--card-bg)',
        boxShadow: '0 4px 12px var(--card-shadow)'
      }}
    >
      <div className="flex  md:flex-row md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold">{name}, {country}</h2>
          <p className="text-lg capitalize">{description}</p>
          <div className="mt-4 text-5xl font-bold">
            {Math.round(temp)}°C
          </div>
          <p> Feels like : {Math.round(feels_like)} °C </p>
        </div>
        
        <div className="flex flex-col items-center">
          <WeatherIcon icon={icon} description={description} size={120} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="flex items-center gap-2">
          <FiDroplet size={20} className="text-blue-500" />
          <span>Humidity: {humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <FiWind size={20} className="text-blue-300" />
          <span>Wind: {Math.round(wind.speed)} km/h</span>
        </div>
        <div className="flex items-center gap-2">
            <FiSun className='text-amber-300' size={20}/>
          <span>Rise: {formatTime(sunrise)}</span>
        </div>
        <div className="flex items-center gap-2">
          <TbSunset2 className='text-amber-600' size={20} />
          <span>Set: {formatTime(sunset)}</span>
        </div>
      </div>
    </motion.div>
  );
}