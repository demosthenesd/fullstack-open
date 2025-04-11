import countryService from '../services/countries'

import { useState,useEffect } from 'react';

const Weather = ({ countryName }) => {


    const [weatherInfo, setWeatherInfo] = useState("");

    useEffect(() => {
        countryService.getWeather(countryName).then((res) => setWeatherInfo(res.list[0]));
    }, [])

    if (!weatherInfo) return <p>Loading weather...</p>;

    return (
        <div>
            <h1>Weather in {countryName}</h1>
            <p>Temperature: {weatherInfo.main.temp}</p>
            <p>Feels like: {weatherInfo.main.feels_like}</p>
            <img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} />
            <p>Description: {weatherInfo.weather[0].description}</p>
            <p>Wind: {weatherInfo.wind.speed + "m/s"}</p>
        </div>
    )
}

export default Weather;