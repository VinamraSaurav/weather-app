import { API_URL } from "@/utils/constants";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  const type = searchParams.get('type') || 'current'; 
  
  const API_KEY = process.env.OPENWEATHER_API_KEY;
  
  try {
    let url = '';
    if (lat && lon) {
      if (type === 'current') {
        url = `${API_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      } else if (type === 'forecast') {
        url = `${API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      }
    } 
    else if (city) {
      if (type === 'current') {
        url = `${API_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
      } else if (type === 'forecast') {
        url = `${API_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
      }
    } else {
      return new Response(JSON.stringify({ error: 'City or coordinates are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
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