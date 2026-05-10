import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './css/CropSolution.css';

function CropSolution() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await axios.get('https://govimithuru-backend.onrender.com/cropSolutions');
        setCrops(response.data);
      } catch (error) {
        console.error('Error fetching crop solutions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();

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

  return (
    <div className="crop-solution">
      <h2>Crop Solutions</h2>
      <div className="crops" ref={scrollContainerRef}>
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div className="crop-item skeleton" key={idx}>
                <div className="skeleton-img" />
                <div className="skeleton-text" />
              </div>
            ))
          : crops.map((crop, index) => (
              <div className="crop-item" key={index}>
                <img src={crop.img} alt={crop.title} />
                <p>{crop.title}</p>
              </div>
            ))}
      </div>
    </div>
  );
}

export default CropSolution;
