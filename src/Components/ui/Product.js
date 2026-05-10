import React, { useState } from 'react';
import { Search, Leaf, Droplets, Settings, ShieldCheck, TreePine, Flower, Zap } from 'lucide-react';


// Mock category data with icons
const categories = [
  { 
    name: 'SEEDS', 
    image: '/seeds.jpg',
    link: '/seeds',
    icon: Leaf,
    description: 'Premium quality seeds for all crops',
    color: '#10B981'
  },
  { 
    name: 'Growth Promoters', 
    image: '/growth Promoters.webp',
    link: '/growthPromoters',
    icon: Zap,
    description: 'Boost your crop growth naturally',
    color: '#059669'
  },
  { 
    name: 'Remedies', 
    image: '/ramedis.png',
    link: '/remedies',
    icon: ShieldCheck,
    description: 'Effective plant protection solutions',
    color: '#3B82F6'
  },
  { 
    name: 'Organic Farming', 
    image: '/organinc farming.png',
    link: '/organicFarming',
    icon: Leaf,
    description: 'Sustainable organic solutions',
    color: '#84CC16'
  },
  { 
    name: 'Equipments', 
    image: '/eqump.jpg',
    link: '/equipments',
    icon: Settings,
    description: 'Modern farming equipment',
    color: '#F97316'
  },
  { 
    name: 'Fertilizers', 
    image: '/fertilizer.jpg',
    link: '/fertilizers',
    icon: TreePine,
    description: 'Nutrient-rich fertilizers',
    color: '#F59E0B'
  },
  { 
    name: 'Irrigation', 
    image: '/irrigation.jpg',
    link: '/irrigation',
    icon: Droplets,
    description: 'Smart irrigation systems',
    color: '#06B6D4'
  },
  { 
    name: 'Gardening', 
    image: '/gardening.png',
    link: '/gardening',
    icon: Flower,
    description: 'Beautiful garden essentials',
    color: '#EC4899'
  },
];

function Product() {
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter categories based on the search term
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0fdfa 100%)',
    fontFamily: 'Arial, sans-serif'
  };

  const heroStyle = {
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(90deg, #059669 0%, #10B981 50%, #0D9488 100%)',
    color: 'white'
  };

  const heroOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  };

  const heroContentStyle = {
    position: 'relative',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '4rem 1rem',
    textAlign: 'center'
  };

  const heroTitleStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
  };

  const heroSubtitleStyle = {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    opacity: 0.9,
    maxWidth: '800px',
    margin: '0 auto 2rem auto'
  };

  const searchSectionStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem'
  };

  const searchContainerStyle = {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto'
  };

  const searchInputStyle = {
    width: '100%',
    paddingLeft: '3rem',
    paddingRight: '1rem',
    paddingTop: '1rem',
    paddingBottom: '1rem',
    fontSize: '1.1rem',
    border: '2px solid #e5e7eb',
    borderRadius: '1rem',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
  };

  const searchButtonStyle = {
    marginTop: '1rem',
    width: '100%',
    background: 'linear-gradient(90deg, #059669, #10B981)',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  };

  const gridStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem 4rem 1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem'
  };

  const cardStyle = {
    position: 'relative',
    backgroundColor: 'white',
    borderRadius: '1.5rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'all 0.5s ease',
    transform: 'translateY(0)',
  };

  const cardHoverStyle = {
    ...cardStyle,
    transform: 'translateY(-8px)',
    boxShadow: '0 25px 50px rgba(0,0,0,0.2)'
  };

  const imageContainerStyle = {
    position: 'relative',
    height: '200px',
    overflow: 'hidden'
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.7s ease'
  };

  const imageHoverStyle = {
    ...imageStyle,
    transform: 'scale(1.1)'
  };

  const imageOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%, transparent 100%)'
  };

  const iconContainerStyle = (color, isHovered) => ({
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: '0.75rem',
    borderRadius: '50%',
    backgroundColor: color,
    color: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    transform: isHovered ? 'scale(1.1) rotate(12deg)' : 'scale(1) rotate(0deg)',
    transition: 'all 0.3s ease'
  });

  const cardContentStyle = {
    padding: '1.5rem'
  };

  const cardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '0.5rem',
    transition: 'color 0.3s ease'
  };

  const cardDescriptionStyle = {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: '1rem',
    lineHeight: '1.5'
  };

  const cardActionStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const exploreTextStyle = {
    color: '#059669',
    fontWeight: '600',
    transition: 'color 0.3s ease'
  };

  const arrowContainerStyle = {
    width: '2rem',
    height: '2rem',
    backgroundColor: '#f0fdf4',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  };

  const hoverOverlayStyle = (isVisible) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(90deg, rgba(5, 150, 105, 0.9), rgba(16, 185, 129, 0.9))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: isVisible ? 1 : 0,
    pointerEvents: isVisible ? 'auto' : 'none',
    transition: 'opacity 0.3s ease'
  });

  const hoverContentStyle = {
    textAlign: 'center',
    color: 'white'
  };

  const featuresStyle = {
    backgroundColor: 'white',
    padding: '4rem 0'
  };

  const featuresContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem'
  };

  const featuresTitleStyle = {
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const featuresGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem'
  };

  const featureCardStyle = {
    textAlign: 'center',
    padding: '2rem 1.5rem',
    borderRadius: '1rem',
    backgroundColor: '#f9fafb',
    transition: 'background-color 0.3s ease'
  };

  const featureIconStyle = (bgColor) => ({
    width: '4rem',
    height: '4rem',
    backgroundColor: bgColor,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem auto'
  });

  const noResultsStyle = {
    textAlign: 'center',
    padding: '4rem 1rem'
  };

  const noResultsIconStyle = {
    width: '6rem',
    height: '6rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1rem auto'
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <div style={heroOverlayStyle}></div>
        <div style={heroContentStyle}>
          <h1 style={heroTitleStyle}>
            Agricultural Solutions
          </h1>
          <p style={heroSubtitleStyle}>
            Discover premium agricultural products to enhance your farming experience
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div style={searchSectionStyle}>
        <div style={searchContainerStyle}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search products, categories, and brands..."
              value={searchTerm}
              onChange={handleSearch}
              style={searchInputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#10B981';
                e.target.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
              }}
            />
            <Search 
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af',
                width: '1.5rem',
                height: '1.5rem'
              }} 
            />
          </div>
          
          <button 
            style={searchButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.02)';
              e.target.style.background = 'linear-gradient(90deg, #047857, #059669)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.background = 'linear-gradient(90deg, #059669, #10B981)';
            }}
          >
            <Search style={{ width: '1.25rem', height: '1.25rem' }} />
            Search by Technical Name
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div style={gridStyle}>
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => {
            const IconComponent = category.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={index}
                style={isHovered ? cardHoverStyle : cardStyle}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => window.location.href = category.link}
              >
                {/* Image Container */}
                <div style={imageContainerStyle}>
                  <img
                    src={category.image}
                    alt={category.name}
                    style={isHovered ? imageHoverStyle : imageStyle}
                  />
                  <div style={imageOverlayStyle}></div>
                  
                  {/* Floating Icon */}
                  <div style={iconContainerStyle(category.color, isHovered)}>
                    <IconComponent style={{ width: '1.5rem', height: '1.5rem' }} />
                  </div>
                </div>

                {/* Content */}
                <div style={cardContentStyle}>
                  <h3 style={{
                    ...cardTitleStyle,
                    color: isHovered ? '#059669' : '#1f2937'
                  }}>
                    {category.name}
                  </h3>
                  <p style={cardDescriptionStyle}>
                    {category.description}
                  </p>
                  
                  {/* Action Button */}
                  <div style={cardActionStyle}>
                    <span style={{
                      ...exploreTextStyle,
                      color: isHovered ? '#047857' : '#059669'
                    }}>
                      Explore Products
                    </span>
                    <div style={{
                      ...arrowContainerStyle,
                      backgroundColor: isHovered ? '#059669' : '#f0fdf4'
                    }}>
                      <svg 
                        style={{
                          width: '1rem',
                          height: '1rem',
                          color: isHovered ? 'white' : '#059669',
                          transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
                          transition: 'all 0.3s ease'
                        }}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div style={hoverOverlayStyle(isHovered)}>
                  <div style={hoverContentStyle}>
                    <IconComponent style={{
                      width: '3rem',
                      height: '3rem',
                      margin: '0 auto 1rem auto',
                      animation: isHovered ? 'bounce 1s infinite' : 'none'
                    }} />
                    <h4 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                      {category.name}
                    </h4>
                    <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
                      Click to explore
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div style={noResultsStyle}>
            <div style={noResultsIconStyle}>
              <Search style={{ width: '2.5rem', height: '2.5rem', color: '#9ca3af' }} />
            </div>
            <h3 style={{ fontSize: '2rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              No categories found
            </h3>
            <p style={{ color: '#6b7280' }}>
              Try adjusting your search terms
            </p>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div style={featuresStyle}>
        <div style={featuresContainerStyle}>
          <div style={featuresTitleStyle}>
            <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
              Why Choose Our Products?
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>
              Quality, sustainability, and innovation in every product
            </p>
          </div>
          
          <div style={featuresGridStyle}>
            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f0fdf4'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f9fafb'}
            >
              <div style={featureIconStyle('#10B981')}>
                <ShieldCheck style={{ width: '2rem', height: '2rem', color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Premium Quality
              </h3>
              <p style={{ color: '#6b7280' }}>
                All products undergo rigorous quality testing to ensure the best results for your crops.
              </p>
            </div>
            
            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#eff6ff'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f9fafb'}
            >
              <div style={featureIconStyle('#3B82F6')}>
                <Leaf style={{ width: '2rem', height: '2rem', color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Eco-Friendly
              </h3>
              <p style={{ color: '#6b7280' }}>
                Sustainable farming solutions that protect the environment while maximizing yield.
              </p>
            </div>
            
            <div 
              style={featureCardStyle}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#fff7ed'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#f9fafb'}
            >
              <div style={featureIconStyle('#F97316')}>
                <Zap style={{ width: '2rem', height: '2rem', color: 'white' }} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Expert Support
              </h3>
              <p style={{ color: '#6b7280' }}>
                Get professional guidance and support from our agricultural experts.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translateY(0);
          }
          40%, 43% {
            transform: translateY(-30px);
          }
          70% {
            transform: translateY(-15px);
          }
          90% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
}

export default Product;