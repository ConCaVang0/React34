import { useState, useEffect } from "react";
import style from "./Weather5days.module.css";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

interface DayWeather {
  date: string;
  day: {
    condition: {
      text: string;
      icon: string;
    };
    maxtemp_c: number;
  };
  hour: {
    time: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  }[];
}

interface Weather5Days {
  forecast: {
    forecastday: DayWeather[];
  };
}

const NextDay = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const city = queryParams.get("city");

  const [dayWeather, setDayWeather] = useState<Weather5Days | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/forecast.json?key=c9a0ca46550648b29ce125849232709&q=${city}&days=5&aqi=no&alerts=no&lang=vi`
        );
        const data: Weather5Days = response.data;
        setDayWeather(data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const convertCToF = (celsius: number) => {
    return ((celsius * 9) / 5 + 32).toFixed(1);
  };

  if (!dayWeather) {
    return <div>Loading...</div>;
  }

  return (
    <div className={style.weather}>
      <p className="text-center text-white">Thời tiết 5 ngày kế tiếp của thành phố {city}</p>
      <div className="Weather5">
        {dayWeather?.forecast.forecastday.map((forecastDay, index) => (
          <div
            className={`day${index + 1} ${style.box} h-24 mt-5 flex justify-between items-center text-white`}
            key={index}
          >
            <div>{forecastDay.date}</div>
            <div>
              <p>{forecastDay.day.maxtemp_c}°C</p>
              <p>{convertCToF(forecastDay.day.maxtemp_c)}°F</p>
            </div>
            <div>
              <img src={forecastDay.day.condition.icon} alt="Weather Icon" />
            </div>
            <div>{forecastDay.day.condition.text}</div>
          </div>
        ))}
      </div>
      <div className="text-white text-center mt-5">
        <Link to="/" className="bg-slate-400 p-3 border hover:bg-blue-200">
          Thời tiết hiện tại
        </Link>
      </div>
    </div>
  );
};

export default NextDay;