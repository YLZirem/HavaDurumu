import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";
import gunesbulutImage from './assets/images/gunesbulut.png';
import gunesliImage from './assets/images/gunesli.png';
import yagmurluImage from './assets/images/yagmurlu.png';
import karliImage from './assets/images/karli.png';

function App() {
  const [city, setCity] = useState("Istanbul"); // Varsayılan şehir olarak İstanbul
  const [weather, setWeather] = useState(null); // Hava durumu verisi
  const [error, setError] = useState(""); // Hata mesajları
  const [showAbout, setShowAbout] = useState(false); // Hakkında butonunun tıklanıp tıklanmadığını kontrol etmek için

  const API_KEY = "29961a65729e5fe2a9c5c6a0f78c56f7";

  const getWeather = useCallback(async () => {
    if (!city) {
      setError("Please enter a city name!");
      return;
    }
    setError(""); // Hata mesajını temizle
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try another city.");
      setWeather(null);
    }
  }, [city]); // `city` bağımlılık olarak ekleniyor

  useEffect(() => {
    getWeather();
  }, [getWeather]);

  const getWeatherImage = (condition) => {
    switch (condition) {
      case 'gunesbulut':
        return gunesbulutImage;
      case 'gunesli':
        return gunesliImage;
      case 'yagmurlu':
        return yagmurluImage;
      case 'karli':
        return karliImage;
      default:
        return gunesbulutImage; // Varsayılan bir görsel
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          {weather.wind && <p>Wind Speed: {weather.wind.speed} m/s</p>}
          {weather.weather && (
            <img
              src={getWeatherImage(weather.weather[0].main)}
              alt={weather.weather[0].main}
              style={{ width: '150px', height: '150px' }}
            />
          )}
        </div>
      )}
      
      {/* Hakkında butonu */}
      <button className="about-button" onClick={() => setShowAbout(!showAbout)}>
        Hakkında
      </button>

      {/* Hakkında bilgiler */}
      {showAbout && (
        <div className="about-info">
          <p>İrem Yılmaz</p>
          <p>2220780040</p>
        </div>
      )}
    </div>
  );
}

export default App;
