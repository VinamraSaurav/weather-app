'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiRefreshCw, FiClock } from 'react-icons/fi';
import { useWeather } from '../context/WeatherContext';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [showHistory, setShowHistory] = useState(false);
  const { fetchWeatherData, searchHistory, refreshWeather, loading } = useWeather();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeatherData(query.trim());
      setQuery('');
      setShowHistory(false);
    }
  };
  
  const handleHistoryClick = (city) => {
    fetchWeatherData(city);
    setShowHistory(false);
  };
  
  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <motion.input
            whileFocus={{ scale: 1.01 }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowHistory(true)}
            onBlur={() => setTimeout(() => setShowHistory(false), 200)}
            placeholder="Search for a city..."
            className="w-full py-2 px-4 pr-10 rounded-lg border-none outline-none"
            style={{ 
              backgroundColor: 'var(--search-bg)', 
              color: 'var(--foreground)',
              boxShadow: '0 2px 8px var(--card-shadow)' 
            }}
          />
          {searchHistory.length > 0 && (
            <button 
              type="button"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowHistory(!showHistory)}
            >
              <FiClock size={18} />
            </button>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="p-2 rounded-lg text-white"
          style={{ backgroundColor: 'var(--accent)' }}
          disabled={loading}
        >
          <FiSearch size={20} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={refreshWeather}
          className="p-2 rounded-lg"
          style={{ backgroundColor: 'var(--card-bg)' }}
          disabled={loading}
        >
          <FiRefreshCw 
            size={20} 
            className={loading ? "animate-spin" : ""} 
          />
        </motion.button>
      </form>
      
      {showHistory && searchHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-0 right-0 mt-1 rounded-lg z-10"
          style={{ 
            backgroundColor: 'var(--card-bg)',
            boxShadow: '0 4px 12px var(--card-shadow)' 
          }}
        >
          <ul>
            {searchHistory.map((city, index) => (
              <li key={index}>
                <button
                  className="w-full text-left py-2 px-4 hover:bg-opacity-20 hover:bg-[#0ea5e9] rounded-lg transition-all"
                  onClick={() => handleHistoryClick(city)}
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}