import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onFinished }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out animation after 3.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    // Complete animation and notify parent after 4.5 seconds (animation + fade out)
    const finishTimer = setTimeout(() => {
      if (onFinished) onFinished();
    }, 4500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinished]);

  return (
    <div className={`splash-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <div className="netflix-animation">
          <div className="netflix-logo">
            <span className="logo-text">Aayush</span>
            <span className="logo-highlight">Web Projects</span>
          </div>
          <div className="netflix-loading-bar">
            <div className="loading-animation"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;