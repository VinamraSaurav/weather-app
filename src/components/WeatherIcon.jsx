'use client';

import { getWeatherIconUrl } from '../utils/weatherUtils';
import Image from 'next/image';

export default function WeatherIcon({ icon, description, size = 50 }) {
  const iconUrl = getWeatherIconUrl(icon);
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <Image
        src={iconUrl}
        alt={description || 'Weather icon'}
        width={size}
        height={size}
        className="object-contain"
      />
    </div>
  );
}