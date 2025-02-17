"use client";
import React, { useState, useEffect } from "react";

// Define the type for the time left object
interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

function Timer() {
  // Define the target date with a specific type
  const targetDate: Date = new Date("2024-12-31T00:00:00Z");

  // Function to calculate time left
  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    const formatNumber = (num: number): string => String(num).padStart(2, "0");

    return {
      days: formatNumber(Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: formatNumber(Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: formatNumber(Math.floor((difference / 1000 / 60) % 60)),
      seconds: formatNumber(Math.floor((difference / 1000) % 60)),
    };
  };

  // Use state with the correct type for timeLeft
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Cleanup the interval
  }, []);

  return (
    <div className="absolute w-[100%] top-3 px-6">
      <div className="flex justify-between items-center text-[30px] tracking-widest"
      style={{ fontWeight: 100 }}>
        <div className="flex flex-col items-center">
          <p>{timeLeft.days}</p>
          <p className="text-[7px] uppercase tracking-widest">Days</p>
        </div>
        <div className="flex flex-col items-center">
          <span>{timeLeft.hours}</span>
          <p className="text-[7px] uppercase tracking-widest">Hours</p>
        </div>
        <div className="flex flex-col items-center">
          <span>{timeLeft.minutes}</span>
          <p className="text-[7px] font-normal uppercase tracking-widest">Minutes</p>
        </div>
        <div className="flex flex-col items-center">
          <span>{timeLeft.seconds}</span>
          <p className="text-[7px] font-normal uppercase tracking-widest">Seconds</p>
        </div>
      </div>
    </div>
  );
}

export default Timer;



