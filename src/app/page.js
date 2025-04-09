'use client';

import Layout from '@/components/Layout';
import WeatherDashboard from '@/components/WeatherDashboard';

export default function Home() {
  return (
    <Layout>
      <WeatherDashboard />
    </Layout>
  );
}