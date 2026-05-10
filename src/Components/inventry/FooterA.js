import React from 'react';
import './css/FooterA.css';

function FooterA() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="govimithuru-logo.png" alt="Govimithuru Logo" />
          <p>Govimithuru PVT</p>
          <p>There are many variations of passages of lorem ipsum available, but the majority suffered.</p>
        </div>
        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/projects">Our Projects</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-news">
          <h4>News</h4>
          <ul>
            <li><a href="/news/1">Bringing Food Production Back To Cities</a><span>July 5, 2022</span></li>
            <li><a href="/news/2">The Future of Farming, Smart Irrigation Solutions</a><span>July 5, 2022</span></li>
          </ul>
        </div>
        <div className="footer-contact">
          <h4>Contact</h4>
          <p>Phone: 666 888 0000</p>
          <p>Email: <a href="mailto:needhelp@company.com">needhelp@company.com</a></p>
          <p>Address: 80 Brooklyn Golden Street Line, New York, USA</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterA;
