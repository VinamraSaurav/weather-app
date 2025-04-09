export function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  }
  
  export function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }
  
  export function groupForecastByDay(forecastList) {
    const groupedData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
      
      if (!groupedData[date]) {
        groupedData[date] = [];
      }
      
      groupedData[date].push(item);
    });
    
    return Object.keys(groupedData).map(date => {
      const dayData = groupedData[date];
      const midDayItem = dayData.reduce((closest, item) => {
        const itemHour = new Date(item.dt * 1000).getHours();
        const closestHour = new Date(closest.dt * 1000).getHours();
        return Math.abs(itemHour - 12) < Math.abs(closestHour - 12) ? item : closest;
      }, dayData[0]);
      
      return midDayItem;
    }).slice(0, 5); 
  }