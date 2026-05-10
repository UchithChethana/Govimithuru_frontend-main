import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Irrigation() {
  const [irrigationItems, setIrrigationItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://govimithuru-backend.onrender.com/showcase/irrigation')
      .then((res) => setIrrigationItems(res.data))
      .catch((err) => console.error('Error fetching irrigation items:', err));
  }, []);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const filteredIrrigation = irrigationItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBuyNow = (id) => navigate(`/description/${id}`);

  return (
    <div
      style={{
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: '#f9fafb',
        minHeight: '100vh',
        padding: '2rem 1rem',
        color: '#374151',
      }}
    >
      <section style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '2.8rem',
            fontWeight: '700',
            color: '#059669',
            marginBottom: '1.5rem',
            textAlign: 'center',
            letterSpacing: '1.5px',
          }}
        >
          Irrigation
        </h1>

        {/* Search Bar */}
        <div style={{ maxWidth: '450px', margin: '0 auto 2rem', position: 'relative' }}>
          <input
            type="text"
            placeholder="Search for irrigation items..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              padding: '12px 16px',
              fontSize: '16px',
              borderRadius: '12px',
              border: '2px solid #059669',
              outline: 'none',
              boxShadow: '0 2px 8px rgb(5 150 105 / 0.2)',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={e => e.currentTarget.style.borderColor = '#047857'}
            onBlur={e => e.currentTarget.style.borderColor = '#059669'}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '2rem',
            padding: '0 1rem',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: '600',
                color: '#111827',
                margin: '0 0 0.3rem 0',
              }}
            >
              IRRIGATION
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>
              (Total products: {filteredIrrigation.length})
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.8rem',
            padding: '0 1rem',
          }}
        >
          {filteredIrrigation.length > 0 ? (
            filteredIrrigation.map(item => (
              <div
                key={item._id}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 6px 15px rgba(5, 150, 105, 0.15)',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  cursor: 'pointer',
                }}
                onClick={() => handleBuyNow(item._id)}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(5, 150, 105, 0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 6px 15px rgba(5, 150, 105, 0.15)';
                }}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleBuyNow(item._id)}
                aria-label={`View details and buy ${item.name}`}
              >
                <img
                  src={`data:image/jpeg;base64,${item.imageBase64}`}
                  alt={item.name}
                  style={{
                    width: '160px',
                    height: '160px',
                    objectFit: 'cover',
                    borderRadius: '14px',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                  }}
                />
                <h4
                  style={{
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    color: '#065F46',
                    marginBottom: '0.4rem',
                  }}
                >
                  {item.name}
                </h4>
                <p
                  style={{
                    fontWeight: '600',
                    color: '#059669',
                    fontSize: '1rem',
                    marginBottom: '0.4rem',
                  }}
                >
                  Price: Rs{item.price.toFixed(2)}
                  {item.discount > 0 && (
                    <>
                      <span
                        style={{
                          marginLeft: '8px',
                          textDecoration: 'line-through',
                          color: '#9CA3AF',
                          fontWeight: '400',
                          fontSize: '0.9rem',
                        }}
                      >
                        Rs{(item.price - (item.price * (item.discount / 100))).toFixed(2)}
                      </span>
                      <span
                        style={{
                          marginLeft: '6px',
                          color: '#10B981',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                        }}
                      >
                        {item.discount}% off
                      </span>
                    </>
                  )}
                </p>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    handleBuyNow(item._id);
                  }}
                  style={{
                    backgroundColor: '#059669',
                    color: 'white',
                    padding: '0.5rem 1.3rem',
                    borderRadius: '12px',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    marginTop: 'auto',
                    boxShadow: '0 4px 12px rgba(5, 150, 105, 0.6)',
                    transition: 'background-color 0.3s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#047857')}
                  onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#059669')}
                  aria-label={`Buy now ${item.name}`}
                >
                  Buy Now
                </button>
              </div>
            ))
          ) : (
            <p
              style={{
                gridColumn: '1 / -1',
                fontSize: '1.2rem',
                color: '#6B7280',
                textAlign: 'center',
              }}
            >
              No irrigation items available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Irrigation;
