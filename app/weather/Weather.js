'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherComponent = () => {
    const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const GEOCODING_API_KEY = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getCityName(lat, lon);
        });
    }, []);

    const getCityName = async (lat, lon) => {
        try {
            const res = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${GEOCODING_API_KEY}&language=en`
            );
            const cityName = res.data.results[0].components.city || res.data.results[0].components.town;
            getWeather(cityName);
            // console.log(cityName)
        } catch (err) {
            console.error('Error fetching city name:', err);
        }
    };

    const getWeather = async (cityName) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${WEATHER_API_KEY}&units=metric`
            );

            const weatherId = res.data.weather[0].id;
            const city = res.data.name;
            const temp = Math.round(res.data.main.temp);

            setWeather({
                id: weatherId,
                name: city,
                temp: temp,
            });
        } catch (err) {
            console.error('Error fetching weather data:', err);
        }
    };

    const selectIcon = () => {
        let iconId = weather.id === 800 ? "800" : (parseInt(weather.id) / 100).toFixed(0);
        return `/${iconId}.png`;
    };

    if (!weather) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{display: "flex", alignItems: "center", marginRight: 30}}>
            <img style={{marginRight: 10}} src={selectIcon()} alt="weatherIcon" />
            <p style={{display: "block"}}>{weather.name} {weather.temp}°C</p>
        </div>
    );
};

export default WeatherComponent;
