import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/seeds.css';

function Bulk() {
  const [bulkItems, setBulkItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://govimithuru-backend.onrender.com/showcase/bulk')
      .then((res) => {
        setBulkItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching bulk items:', err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBulk = bulkItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

  return (
    <div className="bulk-page">
      <section className="bulk-section">
        <h1>Bulk Products</h1>
        
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for bulk products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="bulk-info">
          <div className="info-left">
            <h3>BULK PRODUCTS</h3>
            <p>(Total products: {filteredBulk.length})</p>
          </div>

          <div className="info-right">
            <div className="products-grid">
              {filteredBulk.length > 0 ? (
                filteredBulk.map((item) => (
                  <div className="product-card" key={item._id}>
                    <img 
                      src={`data:image/jpeg;base64,${item.imageBase64}`} 
                      alt={item.name} 
                    />
                    <h4>{item.name}</h4>
                    <p>
                      Price: ${item.price.toFixed(2)}
                      {item.discount > 0 && (
                        <>
                          <span className="discount"> (${(item.price - (item.price * (item.discount / 100))).toFixed(2)})</span>
                          <span className="discount-percentage"> {item.discount}% off</span>
                        </>
                      )}
                    </p>
                    <button 
                      className="buy-now-btn"
                      onClick={() => handleBuyNow(item._id)}
                    >
                      Buy Now
                    </button>
                  </div>
                ))
              ) : (
                <p>No bulk items available.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Bulk;
