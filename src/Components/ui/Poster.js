import React, { useState, useEffect } from 'react';
import './css/Poster.css';
import Banner1 from './img/banner1.webp';
import Banner2 from './img/banner2.webp';
import Banner3 from './img/backgroun3.webp';
import Banner4 from './img/background4.webp';

function Poster({ altText = "Slideshow image" }) {
  const images = [Banner4, Banner1, Banner2, Banner3];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6 seconds per slide

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="poster" aria-label="Image slideshow">
      {images.map((imgSrc, index) => (
        <img
          key={index}
          src={imgSrc}
          alt={altText}
          className={`poster-img ${index === currentIndex ? 'active' : ''}`}
          aria-hidden={index !== currentIndex}
        />
      ))}
      {/* Optional overlay text example */}
      {/* <div className="poster-text">Fresh Agricultural Products</div> */}
    </div>
  );
}

export default Poster;
