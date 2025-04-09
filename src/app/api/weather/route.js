import { API_URL } from "@/utils/constants";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const type = searchParams.get('type') || 'current'; 
    if (!city) {
      return new Response(JSON.stringify({ error: 'City parameter is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    
    try {
      let url = '';
      if (type === 'current') {
        url = `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
      } else if (type === 'forecast') {
        url = `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      }
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (response.ok) {
        return new Response(JSON.stringify(data), {
          headers: { 'Content-Type': 'application/json' }
        });
      } else {
        return new Response(JSON.stringify({ error: data.message || 'Failed to fetch weather data' }), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch weather data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }