import { useState, useEffect } from 'react';
import axios from 'axios';

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
}

interface HourlyWeather {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
  date: string; // Add the date property here
}

interface Weather5Days {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: {
      date: string;
      day: {
        condition: {
          text: string;
        };
        maxtemp_c: number;
      };
      hour: HourlyWeather[]; // Include the HourlyWeather interface here
    }[];
  };
}

const Weather5Days = () => {
  const [dayWeather, setDayWeather] = useState<Weather5Days | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          'https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=Danang&days=5&aqi=no&alerts=no&lang=vi'
        );
        const data: Weather5Days = response.data;   
        setDayWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className='weather'>
      {/* Hiển thị dữ liệu thời tiết */}
      {dayWeather && (
        <div>
          <h2>{dayWeather.location.name}</h2>
          {/* Hiển thị thông tin thời tiết cho các ngày */}
          {dayWeather.forecast.forecastday.map((day) => (
            <div key={day.date}>
              <p>{day.date}</p>
              <p>{day.day.condition.text}</p>
              <p>{day.day.maxtemp_c}&deg;C</p>
              {/* Hiển thị thông tin thời tiết hàng giờ */}
              {day.hour.map((hour) => (
                <div key={hour.time}>
                  <p>{hour.date}</p> {/* Display the date property here */}
                  <p>{hour.time}</p>
                  <p>{hour.temp_c}&deg;C</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Weather5Days;