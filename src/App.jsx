import React, { useState, useEffect } from "react";
import reactLogo from "./assets/logo.svg";
import PDFViewer from "./PDFViewer";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [count, setCount] = useState(0);
  const [countFontSize, setCountFontSize] = useState(48);
  const [timerFontSize, setTimerFontSize] = useState(48);
  const [minutesPassed, setMinutesPassed] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          const newSeconds = prevSeconds + 1;

          // Mettre à jour les minutes écoulées
          if (newSeconds % 60 === 0) {
            setMinutesPassed((prevMinutes) => {
              const newMinutes = prevMinutes + 1;
              if (newMinutes <= 3) {
                setTimerFontSize((prevSize) => prevSize + 6);
              }
              return newMinutes;
            });
          }

          // Mettre à jour le compteur toutes les 3 minutes
          if (newSeconds % (3 * 60) === 0) {
            setCount((prevCount) => {
              const newCount = prevCount + 1;
              setCountFontSize((prevSize) => prevSize + 6);
              return newCount;
            });
          }

          return newSeconds;
        });
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isActive]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(true);
    setCount(0);
    setMinutesPassed(0);
    setCountFontSize(48);
    setTimerFontSize(48);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div id="main">
      <div id="left">
        <img src={reactLogo} alt="Elix Logo" />
        <br />
        <div id="counter">
          <h2 style={{ fontSize: `${timerFontSize}px`, transition: 'font-size 0.5s ease' }}>
            {formatTime(seconds)}
          </h2>
        </div>
        <div id="count-container">
          <h1 id="count" style={{ fontSize: `${countFontSize}px`, transition: 'font-size 0.5s ease' }}>
            {count}
          </h1>
        </div>
      </div>
      <div id="right">
        <PDFViewer />
      </div>
    </div>
  );
}

export default App;
