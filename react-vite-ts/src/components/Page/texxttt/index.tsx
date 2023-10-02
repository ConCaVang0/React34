import { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getHours } from "date-fns";
import { FaSistrix } from "react-icons/fa";

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
}

interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: {
    forecastday: {
      hour: HourlyWeather[];
    }[];
  };
}

const WeatherAppssssss: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[] | null>(
    null
  );
  const currentDate = new Date().toLocaleDateString();
  const currentMinute = new Date().getMinutes();
  const currentHour = getHours(new Date());
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<WeatherData>(
          "https://api.weatherapi.com/v1/forecast.json",
          {
            params: {
              key: "c9a0ca46550648b29ce125849232709",
              q: "Hanoi",
              days: 1,
              aqi: "no",
              alerts: "no",
              lang: "vi",
            },
          }
        );
        const data = response.data;
        setWeatherData(data);
        setHourlyWeather(data.forecast.forecastday[0].hour);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData || !hourlyWeather) {
    return <div>Loading...</div>;
  }

  const { location, current } = weatherData;

  const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 5000,
    arrows: false,
  };

  return (
    <div className="weather">
      <div className="TimeDay text-white">
        <div>{currentDate}</div>
        <div>
          {currentHour}:{currentMinute}
        </div>
      </div>
      <div className="input-container">
        <input type="text" placeholder="Tìm tên thành phố" className="search" />
        <span className="icon">
          <a href="">
            <FaSistrix />
          </a>
        </span>
      </div>
      <div className="content">
        <div className="capital">
          <p className="city">{location.name}</p>
          <p className="detail">
            <img src={current.condition.icon} alt="Weather Icon" />
          </p>
          <span>{current.condition.text}</span>
          <p className="Temp">{current.temp_c}°C</p>
          <span>{current.temp_f}°F</span>
        </div>
      </div>
      <div className="NextHour ">
        <div className="Hour_item--separate pt-5 pb-5">Thời tiết hàng giờ</div>
        <Slider {...sliderSettings} className="slider">
          {hourlyWeather.map((hour: HourlyWeather, index: number) => {
            const hourOfDay = getHours(new Date(hour.time));
            if (hourOfDay >= currentHour && hourOfDay <= currentHour + 24) {
              const nextHour = hourOfDay + 1;
              const nextTime = `${nextHour}:00`; 
              return (
                <div key={index} className="box">
                  <p>{nextTime}</p>
                  <p>{hour.temp_c}°C</p>
                  <img src={hour.condition.icon} alt="Weather Icon" />
                  <p>{hour.temp_f}°F</p>
                </div>
              );
            }
            return null;
          })}
        </Slider>
      </div>
      <div className='text-white text-center mt-5' >
          <a href='' className='bg-slate-400 p-3 border hover:bg-blue-200'>Thời tiết 5 ngày kế tiếp</a>
        </div>
    </div>
  );
};

export default WeatherAppssssss;