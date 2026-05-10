import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';

function GrowthPromoters() {
  const [promoterItems, setPromoterItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://govimithuru-backend.onrender.com/showcase/Growthpromoters')
      .then((res) => {
        setPromoterItems(res.data);
      })
      .catch((err) => {
        console.error('Error fetching growth promoters:', err);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPromoters = promoterItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort promoters based on selected order
  const sortedPromoters = [...filteredPromoters].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.price - b.price; // Ascending order
    } else {
      return b.price - a.price; // Descending order
    }
  });

  const handleBuyNow = (id) => {
    navigate(`/description/${id}`);
  };

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
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
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
          Growth Promoters
        </h1>

        {/* Search Bar */}
        <div
          style={{
            maxWidth: '450px',
            margin: '0 auto 2rem',
            position: 'relative',
          }}
        >
          <input
            type="text"
            placeholder="Search for growth promoters..."
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              fontSize: '16px',
              borderRadius: '12px',
              border: '2px solid #059669',
              outline: 'none',
              boxShadow: '0 2px 8px rgb(5 150 105 / 0.2)',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#047857')}
            onBlur={(e) => (e.target.style.borderColor = '#059669')}
          />
          <FaSearch
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#059669',
              fontSize: '20px',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginBottom: '2rem',
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
              GROWTH PROMOTERS
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#6B7280',
                margin: 0,
              }}
            >
              (Total products: {sortedPromoters.length})
            </p>
          </div>

          {/* Sorting Options */}
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => setSortOrder('asc')}
              style={{
                backgroundColor: sortOrder === 'asc' ? '#059669' : 'transparent',
                color: sortOrder === 'asc' ? 'white' : '#059669',
                border: '2px solid #059669',
                borderRadius: '10px',
                padding: '8px 16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                userSelect: 'none',
              }}
              onMouseEnter={e => {
                if(sortOrder !== 'asc') {
                  e.currentTarget.style.backgroundColor = '#D1FAE5';
                  e.currentTarget.style.color = '#065F46';
                }
              }}
              onMouseLeave={e => {
                if(sortOrder !== 'asc') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#059669';
                }
              }}
              aria-label="Sort ascending"
            >
              <FaSortAmountUp /> Ascending
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              style={{
                backgroundColor: sortOrder === 'desc' ? '#059669' : 'transparent',
                color: sortOrder === 'desc' ? 'white' : '#059669',
                border: '2px solid #059669',
                borderRadius: '10px',
                padding: '8px 16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.3s ease',
                userSelect: 'none',
              }}
              onMouseEnter={e => {
                if(sortOrder !== 'desc') {
                  e.currentTarget.style.backgroundColor = '#D1FAE5';
                  e.currentTarget.style.color = '#065F46';
                }
              }}
              onMouseLeave={e => {
                if(sortOrder !== 'desc') {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#059669';
                }
              }}
              aria-label="Sort descending"
            >
              <FaSortAmountDown /> Descending
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
            gap: '1.8rem',
          }}
        >
          {sortedPromoters.length > 0 ? (
            sortedPromoters.map((item) => (
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleBuyNow(item._id);
                }}
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
                  onClick={(e) => {
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
              No growth promoter items available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

export default GrowthPromoters;
