'use client';

import { motion } from 'framer-motion';
import { FiDroplet, FiSun, FiWind } from 'react-icons/fi';
import { TbSunset2 } from 'react-icons/tb';
import WeatherIcon from './WeatherIcon';
import { formatTime } from '../utils/dateUtils';
import { FaThermometerHalf } from 'react-icons/fa';

function getTemperatureGradient(temp) {
  if (temp >= 35) {
    return 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600';
  } else if (temp >= 25) {
    return 'bg-gradient-to-r from-yellow-200 via-orange-300 to-pink-300'; 
  } else if (temp >= 15) {
    return 'bg-gradient-to-r from-blue-100 via-cyan-100 to-teal-100';
  } else if (temp >= 5) {
    return 'bg-gradient-to-r from-blue-300 via-blue-400 to-indigo-500';
  } else {
    return 'bg-gradient-to-r from-white via-sky-100 to-blue-200';
  }
}

function isLightGradient(temp) {
  return temp <= 30;
}

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

  const gradient = getTemperatureGradient(temp);
  const textColor = isLightGradient(temp) ? 'text-gray-900' : 'text-white';

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative overflow-hidden rounded-2xl mb-6 transition-all duration-700 ease-in-out shadow-lg ${gradient} ${textColor}`}
    >
      <div className='backdrop-blur-2xl bg-white/20 dark:bg-black/05 p-6 rounded-2xl'>
      <div className="flex flex-row flex-wrap md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-3xl font-bold">{name}, {country}</h2>
          <p className="text-lg capitalize">{description}</p>
          <div className="mt-4 text-5xl font-bold">
            {Math.round(temp)}°C
          </div>
          <p className="mt-1 text-md flex gap-1 items-center"><span><FaThermometerHalf/></span>Feels like: {Math.round(feels_like)}°C</p>
        </div>
        
        <div className="flex flex-col items-center">
          <WeatherIcon icon={icon} description={description} size={90} />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-auto mt-6 text-sm sm:text-base ${textColor} ">
        <div className="flex items-center gap-2">
          <FiDroplet size={20} />
          <span>Humidity: {humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <FiWind size={20} />
          <span>Wind: {Math.round(wind.speed)} km/h</span>
        </div>
        <div className="flex items-center gap-2">
          <FiSun  size={20} />
          <span>Rise: {formatTime(sunrise)}</span>
        </div>
        <div className="flex items-center gap-2">
          <TbSunset2  size={20} />
          <span>Set: {formatTime(sunset)}</span>
        </div>
      </div>
      </div>
    </motion.div>
  );
}
