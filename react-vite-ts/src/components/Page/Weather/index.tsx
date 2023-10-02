import { FaSistrix } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

interface HourlyWeather {
  time: string;
  temp_c: number;
  temp_f: number;
  condition: {
    text: string;
    icon: string;
  };
}

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    location: {
      name: string;
      region: string;
      country: string;
      lat: number;
      lon: number;
    };
    current: {
      temp_c: number;
      temp_f: number;
      condition: {
        text: string;
        icon: string;
        code: number;
      };
    };
  } | null>(null);
  const currentDate = new Date().toLocaleDateString();
  const currentMinute = new Date().getMinutes();
  const currentHour = new Date().getHours();

  const [hourlyWeather, setHourlyWeather] = useState<HourlyWeather[] | null>(
    null
  );
  const [city, setCity] = useState("Đà Nẵng");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.weatherapi.com/v1/forecast.json",
          {
            params: {
              key: "c9a0ca46550648b29ce125849232709",
              q: city,
              days: 2,
              aqi: "no",
              alerts: "no",
              lang: "vi",
            },
          }
        );
        const data = response.data;
        setWeatherData(data);
        setHourlyWeather(data.forecast.forecastday[1].hour);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };

    fetchData();
  }, [city]);

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

  const getNext24Hours = (): HourlyWeather[] => {
    const currentDateTime = new Date();
    currentDateTime.setHours(currentDateTime.getHours() + 1);

    const next24Hours: HourlyWeather[] = [];

    for (let i = 0; i < 24; i++) {
      const nextHourDateTime = new Date(
        currentDateTime.getTime() + i * 60 * 60 * 1000
      );
      nextHourDateTime.setMinutes(0);
      const nextHourTimeString = nextHourDateTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const nextHourWeather = hourlyWeather.find((hour) => {
        const hourDateTime = new Date(hour.time);
        return hourDateTime.getHours() === nextHourDateTime.getHours();
      });

      if (nextHourWeather) {
        next24Hours.push({
          ...nextHourWeather,
          time: nextHourTimeString,
        });
      }
    }

    return next24Hours;
  };

  const next24Hours = getNext24Hours();

  const handleSearch = () => {
    setCity(city);
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
        <input
          className="search"
          type="text"
          placeholder="Tìm tên thành phố"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <span className="icon">
          <a
            role="button"
            tabIndex={0}
            onClick={handleSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          >
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
      <div className="NextHour">
        <div className="Hour_item--separate pt-5 pb-5">
          Thời tiết hàng giờ
        </div>
        <Slider {...sliderSettings} className="slider">
          {next24Hours.map((hour: HourlyWeather, index: number) => (
            <div key={index} className="box">
              <p>{hour.time}</p>
              <p>{hour.temp_c}°C</p>
              <img src={hour.condition.icon} alt="Weather Icon" />
              <p>{hour.temp_f}°F</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="text-white text-center mt-5">
        <Link
          to={{
            pathname: "/NextDay",
            search: `?city=${encodeURIComponent(city)}`,
          }}
          className="bg-slate-400 p-3 border hover:bg-blue-200 hover:text-gray-500"
        >
          Thời tiết 5 ngày kế tiếp
        </Link>
      </div>
    </div>
  );
};

export default WeatherApp;