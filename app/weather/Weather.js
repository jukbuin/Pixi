'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";

const WeatherComponent = () => {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            getWeather(lat, lon);
            console.log("lat: " + lat);
            console.log("lon: " + lon)
        });
    }, []);

    const getWeather = async (lat, lon) => {
        try {
            const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );
            console.log(res)

            const weatherId = res.data.weather[0].id;
            const cityName = res.data.name;
            const temp = Math.round(res.data.main.temp);

            setWeather({
                id: weatherId,
                name: cityName,
                temp: temp,
            });
        } catch (err) {
            console.error(err);
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
