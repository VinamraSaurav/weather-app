'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useLocalStorage('theme', 'system');
  const [currentCity, setCurrentCity] = useState('');

  useEffect(() => {
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(systemTheme);
    } else {
      document.documentElement.classList.remove('dark', 'light');
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  const fetchWeatherData = async (city) => {
    if (!city) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const currentResponse = await fetch(`/api/weather?city=${city}&type=current`);
      const currentData = await currentResponse.json();
      
      if (!currentResponse.ok) {
        throw new Error(currentData.error || 'Failed to fetch current weather');
      }
      
      setCurrentWeather(currentData);
      
      const forecastResponse = await fetch(`/api/weather?city=${city}&type=forecast`);
      const forecastData = await forecastResponse.json();
      
      if (!forecastResponse.ok) {
        throw new Error(forecastData.error || 'Failed to fetch forecast');
      }
      
      setForecast(forecastData);
      
      updateSearchHistory(city);
      setCurrentCity(city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSearchHistory = (city) => {
    setSearchHistory(prev => {
      const filteredHistory = prev.filter(item => item.toLowerCase() !== city.toLowerCase());
      return [city, ...filteredHistory].slice(0, 5);
    });
  };

  const toggleTheme = () => {
    setTheme(prevTheme => {
      if (prevTheme === 'light') return 'dark';
      if (prevTheme === 'dark') return 'system';
      return 'light';
    });
  };

  const refreshWeather = () => {
    if (currentCity) {
      fetchWeatherData(currentCity);
    }
  };

  return (
    <WeatherContext.Provider 
      value={{
        currentWeather,
        forecast,
        searchHistory,
        loading,
        error,
        theme,
        currentCity,
        fetchWeatherData,
        toggleTheme,
        refreshWeather
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}