import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import './css/BestSelling.css';

function BestSelling() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const scrollAmount = 300;

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://govimithuru-backend.onrender.com/bestSelling');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching best selling products:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    fetchProducts();

    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollInterval = setInterval(() => {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [scrollAmount]);

  // Skeleton placeholder
  const skeletons = Array.from({ length: 4 }).map((_, i) => (
    <div className="product-item skeleton" key={i}>
      <div className="img-skeleton" />
      <div className="title-skeleton" />
      <div className="button-skeleton" />
    </div>
  ));

  return (
    <div className="best-selling">
      <h2>Best Selling</h2>
      <div className="scroll-buttons">
        <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
        <button className="scroll-btn right" onClick={scrollRight}>›</button>
      </div>
      <div className="best-selling-products" ref={scrollContainerRef}>
        {loading
          ? skeletons
          : products.map((product, index) => (
              <div className="product-item" key={index}>
                <img src={product.img} alt={product.title} />
                <h3>{product.title}</h3>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <button>Shop Now</button>
                </a>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BestSelling;
