import React from 'react';
import './css/Banner.css';

function Banner() {
  const bannerText = "Welcome to Govimithuru";

  return (
    <div className="banner">
      <h1 className="banner-title">
        {bannerText.split('').map((char, i) => (
          <span key={i} className="letter">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
}

export default Banner;
