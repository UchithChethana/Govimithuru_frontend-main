import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './css/Offers.css';

function Offers() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('https://govimithuru-backend.onrender.com/offers');
        setOffers(response.data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollInterval = setInterval(() => {
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({
          left: 300,
          behavior: 'smooth',
        });
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  // Skeleton loader component
  const Skeleton = () => (
    <div className="offer-item skeleton">
      <div className="skeleton-img" />
      <div className="skeleton-title" />
      <div className="skeleton-btn" />
    </div>
  );

  return (
    <div className="offers">
      <h2>Today's Offers</h2>
      <div className="scroll-buttons">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>
      <div className="offers-list" ref={scrollContainerRef}>
        {loading ? (
          // Show 3 skeletons while loading
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </>
        ) : offers.length > 0 ? (
          offers.map((offer) => (
            <div className="offer-item" key={offer._id}>
              <img
                src={offer.img || 'path/to/placeholder-image.jpg'}
                alt={offer.title}
              />
              <h3>{offer.title}</h3>
              <a href={offer.link} target="_blank" rel="noopener noreferrer">
                <button>Shop Now</button>
              </a>
            </div>
          ))
        ) : (
          <p>No offers available</p>
        )}
      </div>
    </div>
  );
}

export default Offers;
