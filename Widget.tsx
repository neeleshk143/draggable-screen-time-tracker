import React, { useState, useEffect } from 'react';
import './Widget.css';
import Draggable from 'react-draggable';

const Widget: React.FC = () => {
  const [screenTime, setScreenTime] = useState(0);
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    let idleTimeoutId: NodeJS.Timeout;

    const handleUserActivity = () => {
      clearTimeout(idleTimeoutId);

      if (isIdle) {
        setIsIdle(false);
      }

      timerId = setInterval(() => {
        setScreenTime((prevTime) => prevTime + 1);
      }, 1000);
    };

    const handleUserInactivity = () => {
      clearTimeout(timerId);

      idleTimeoutId = setTimeout(() => {
        setIsIdle(true);
      }, 60000); // Set the idle time threshold here (in milliseconds)

      setScreenTime(0);
    };

    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('mousedown', handleUserActivity);

    window.addEventListener('blur', handleUserInactivity);
    window.addEventListener('visibilitychange', handleUserInactivity);

    return () => {
      clearTimeout(timerId);
      clearTimeout(idleTimeoutId);

      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);

      window.removeEventListener('blur', handleUserInactivity);
      window.removeEventListener('visibilitychange', handleUserInactivity);
    };
  }, [isIdle]);

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const widget = e.currentTarget.parentNode as HTMLDivElement;
    const initialX = e.clientX - widget.offsetLeft;
    const initialY = e.clientY - widget.offsetTop;

    const handleMouseMove = (event: MouseEvent) => {
      const newX = event.clientX - initialX;
      const newY = event.clientY - initialY;

      widget.style.left = `${newX}px`;
      widget.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="widget" style={{ position: 'fixed', top: 0, left: 0 }} onMouseDown={handleMouseDown}>
      <div className="widget-content">
        {isIdle && <div className="idle-indicator">Idle</div>}
        <div className="screen-time">
          <span>Screen Time:</span>
          {formatTime(screenTime)}
        </div>
      </div>
    </div>
  );

};

export default Widget;
