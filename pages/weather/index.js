import { useEffect, useState } from "react";

import axios from "axios";

import styles from "../../styles/Weather.module.css";

import MainButton from "@/components/button/primaryButton";

// Date Builder
const dateBuilder = (d) => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const Weather = () => {
  const [cityName, setCityName] = useState("");
  const [cityWeather, setCityWeather] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [error, setError] = useState(false);

  const searchWeather = async () => {
    try {
      const apiKey = "75b9ff91c1c9b1d204bc50b6ee7bccda";
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
      );
      setSpinner(true);
      setCityWeather(response.data);

      console.log(response.data);
    } catch (error) {
      setError(error);
      setSpinner(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>
          {spinner ? (
            <>
              {cityWeather.sys.country} - {cityWeather.name}
            </>
          ) : (
            <>Weather App</>
          )}
        </h1>
        <p>{cityWeather && cityWeather.weather[0].description}</p>
      </div>

      <div className={styles.searchBox}>
        <input
          type="text"
          placeholder="city name"
          className={styles.input}
          onChange={(e) => setCityName(e.target.value)}
        />
        <MainButton label="search..." click={searchWeather} />
      </div>

      {spinner ? (
        <>
          {cityWeather && (
            <div>
              <div className={styles.img}>
                <img
                  src={`https://openweathermap.org/img/w/${cityWeather.weather[0]["icon"]}.png`}
                  alt="icon"
                />
              </div>

              <div className={styles.temp}>
                <div>
                  <h1>{Math.round(cityWeather.main.temp)}°c</h1>
                  <p>{cityWeather.weather[0].main}</p>
                </div>
                <p>{dateBuilder(new Date())}</p>
              </div>

              <div className={styles.temp}>
                <div>
                  <h1>{cityWeather.main.pressure}</h1>
                </div>
                <p>Pressure</p>
              </div>

              <div className={styles.temp}>
                <div>
                  <h1>{cityWeather.main.humidity}</h1>
                </div>
                <p>Humidity</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className={styles.wait}>
          Search the name of a city to display the weather
        </p>

      )}
    </div>
  );
};

export default Weather;
