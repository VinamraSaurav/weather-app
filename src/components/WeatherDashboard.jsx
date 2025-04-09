'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiAlertCircle } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import DailyForecast from './DailyForecast';
import ThemeToggle from './ThemeToggle';

export default function WeatherDashboard() {
  const { 
    currentWeather, 
    forecast, 
    loading, 
    error, 
    fetchWeatherData,
    currentCity
  } = useWeather();
  
  useEffect(() => {
    if (navigator.geolocation && !currentCity) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            const response = await fetch(`/api/weather?lat=${latitude}&lon=${longitude}&type=current`);
            const data = await response.json();
            
            if (response.ok && data.name) {
              fetchWeatherData(data.name);
            } else {
              fetchWeatherData('Delhi');
            }
          } catch (error) {
            fetchWeatherData('Delhi');
          }
        },
        () => {
          fetchWeatherData('Delhi');
        }
      );
    } else if (!currentCity) {
      fetchWeatherData('Delhi');
    }
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Weather Application</h1>
        <ThemeToggle />
      </div>
      
      <SearchBar />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center py-12"
          >
            <div className="loader">
              <div className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin" 
                style={{ 
                  borderColor: 'var(--card-bg)',
                  borderTopColor: 'var(--accent)'
                }}
              ></div>
            </div>
          </motion.div>
        )}
        
        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
          >
            <div className="flex items-center">
              <FiAlertCircle size={24} className="mr-3" />
              <p>{error}</p>
            </div>
          </motion.div>
        )}
        
        {!loading && !error && currentWeather && (
          <>
            <CurrentWeather data={currentWeather} />
            {forecast && <DailyForecast data={forecast} />}
          </>
        )}
      </AnimatePresence>
      
      <footer className="mt-12 text-center text-sm">
        <p>Data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
}