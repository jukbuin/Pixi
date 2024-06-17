'use client'

import {useEffect, useState} from "react";

export default function Time() {
    const [currentTime, setCurrentTime] = useState(
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    );
    const [currentDate, setCurrentDate] = useState(
        new Date().toLocaleDateString()
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            setCurrentDate(new Date().toLocaleDateString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <p style={{textAlign: "center"}}>{currentTime}</p>
            <p>{currentDate}</p>
        </div>
    );
}