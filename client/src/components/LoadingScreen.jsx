import React, { useEffect, useState, useRef } from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleEnded = () => {
        setTimeout(() => {
          setIsVisible(false);
        }, 300);
      };

      // Fallback timeout in case video doesn't play or fails (10 seconds max)
      const fallbackTimer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);

      video.addEventListener('ended', handleEnded);

      return () => {
        clearTimeout(fallbackTimer);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <video
          ref={videoRef}
          className="loading-video"
          autoPlay
          muted
          playsInline
        >
          <source src="/loading-video.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default LoadingScreen;
