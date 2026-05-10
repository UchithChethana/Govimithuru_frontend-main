import React, { useState } from 'react';
import { 
  Menu, X, Search, Phone, Mail, MapPin, ShoppingCart, User, 
  Leaf, Droplets, Shield, Truck, Award, Star, Heart, Eye,
  Facebook, Twitter, Instagram, Youtube, ArrowRight, CheckCircle,
  MessageCircle, Send, Plus, Minus
} from 'lucide-react';

// Navbar Component
function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    boxShadow: '0 2px 20px rgba(0,0,0,0.1)'
  };

  const topBarStyle = {
    backgroundColor: '#059669',
    color: 'white',
    padding: '0.5rem 0',
    fontSize: '0.9rem'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const mainNavStyle = {
    padding: '1rem 0'
  };

  const logoStyle = {
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#059669',
    textDecoration: 'none'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0
  };

  const navLinkStyle = {
    color: '#374151',
    textDecoration: 'none',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    cursor: 'pointer'
  };

  const actionButtonsStyle = {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  };

  const iconButtonStyle = {
    padding: '0.5rem',
    backgroundColor: '#f3f4f6',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <nav style={navStyle}>
      <div style={topBarStyle}>
        <div style={containerStyle}>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={14} /> +94 789 840 996
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={14} /> info@govimithuru.com
            </span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Facebook size={16} style={{ cursor: 'pointer' }} />
            <Twitter size={16} style={{ cursor: 'pointer' }} />
            <Instagram size={16} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </div>
      
      <div style={mainNavStyle}>
        <div style={containerStyle}>
          <a href="/" style={logoStyle}>🌱 Govimithuru</a>
          
          <ul style={navLinksStyle}>
            <li><a href="/" style={navLinkStyle}>Home</a></li>
            <li><a href="/products" style={navLinkStyle}>Products</a></li>
            <li><a href="/solutions" style={navLinkStyle}>Solutions</a></li>
            <li><a href="/about" style={navLinkStyle}>About</a></li>
            <li><a href="/contact" style={navLinkStyle}>Contact</a></li>
          </ul>
          
          <div style={actionButtonsStyle}>
            <button style={iconButtonStyle}>
              <Search size={18} />
            </button>
            <button style={iconButtonStyle}>
              <User size={18} />
            </button>
            <button style={iconButtonStyle}>
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Banner Component
function Banner() {
  const bannerStyle = {
    marginTop: '120px',
    height: '600px',
    background: 'linear-gradient(135deg, #059669 0%, #10B981 100%)',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  };

  const bannerContentStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center'
  };

  const textContentStyle = {
    color: 'white'
  };

  const titleStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    lineHeight: '1.2'
  };

  const subtitleStyle = {
    fontSize: '1.3rem',
    marginBottom: '2rem',
    opacity: 0.9,
    lineHeight: '1.6'
  };

  const buttonStyle = {
    backgroundColor: 'white',
    color: '#059669',
    padding: '1rem 2rem',
    borderRadius: '50px',
    border: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const imageStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
  };

  return (
    <section style={bannerStyle}>
      <div style={bannerContentStyle}>
        <div style={textContentStyle}>
          <h1 style={titleStyle}>
            Sustainable Agriculture for a Greener Future
          </h1>
          <p style={subtitleStyle}>
            Providing premium agricultural products and expert guidance to help farmers achieve sustainable success and environmental harmony.
          </p>
          <button style={buttonStyle}>
            Explore Our Products
            <ArrowRight size={20} />
          </button>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=400&fit=crop" 
            alt="Sustainable Farming" 
            style={imageStyle}
          />
        </div>
      </div>
    </section>
  );
}

// Poster Component
function Poster() {
  const posterStyle = {
    padding: '4rem 0',
    background: 'linear-gradient(45deg, #f0fdf4, #ecfdf5)',
    textAlign: 'center'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#065f46',
    marginBottom: '1rem'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    color: '#374151',
    marginBottom: '3rem',
    maxWidth: '600px',
    margin: '0 auto 3rem auto'
  };

  const statsStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '2rem',
    marginTop: '3rem'
  };

  const statCardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease'
  };

  const statNumberStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: '0.5rem'
  };

  const statLabelStyle = {
    fontSize: '1.1rem',
    color: '#6b7280',
    fontWeight: '500'
  };

  return (
    <section style={posterStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Growing Together Since 2015</h2>
        <p style={subtitleStyle}>
          Committed to sustainable agriculture and supporting farmers with innovative solutions that protect our environment while maximizing productivity.
        </p>
        
        <div style={statsStyle}>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>500+</div>
            <div style={statLabelStyle}>Happy Farmers</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>50+</div>
            <div style={statLabelStyle}>Products</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>15+</div>
            <div style={statLabelStyle}>Years Experience</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>100%</div>
            <div style={statLabelStyle}>Organic</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Offer Component
function Offer() {
  const [activeOffer, setActiveOffer] = useState(0);

  const offers = [
    {
      title: "Summer Sale - 30% Off",
      description: "Get 30% off on all organic fertilizers and seeds",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
      discount: "30%",
      validUntil: "July 31, 2024"
    },
    {
      title: "Buy 2 Get 1 Free",
      description: "Special offer on plant protection products",
      image: "https://images.unsplash.com/photo-1592806088932-05058af0ad8d?w=400&h=300&fit=crop",
      discount: "33%",
      validUntil: "August 15, 2024"
    },
    {
      title: "Equipment Bundle",
      description: "Complete farming equipment at discounted prices",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
      discount: "25%",
      validUntil: "September 1, 2024"
    }
  ];

  const offerStyle = {
    padding: '4rem 0',
    backgroundColor: '#1f2937',
    color: 'white'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '3rem'
  };

  const offerGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem'
  };

  const offerCardStyle = {
    backgroundColor: 'white',
    color: '#1f2937',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    transition: 'transform 0.3s ease'
  };

  const offerImageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  };

  const offerContentStyle = {
    padding: '2rem'
  };

  const discountBadgeStyle = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  };

  return (
    <section style={offerStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Special Offers</h2>
        
        <div style={offerGridStyle}>
          {offers.map((offer, index) => (
            <div key={index} style={{ ...offerCardStyle, position: 'relative' }}>
              <img src={offer.image} alt={offer.title} style={offerImageStyle} />
              <div style={discountBadgeStyle}>{offer.discount} OFF</div>
              <div style={offerContentStyle}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  {offer.title}
                </h3>
                <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
                  {offer.description}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#9ca3af', marginBottom: '1.5rem' }}>
                  Valid until: {offer.validUntil}
                </p>
                <button style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '0.75rem 2rem',
                  borderRadius: '2rem',
                  border: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  Claim Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CropSolution Component
function CropSolution() {
  const solutions = [
    {
      icon: Leaf,
      title: "Organic Seeds",
      description: "Premium quality organic seeds for sustainable farming",
      features: ["GMO-Free", "High Germination", "Disease Resistant"]
    },
    {
      icon: Droplets,
      title: "Irrigation Systems",
      description: "Smart water management solutions for efficient farming",
      features: ["Water Saving", "Automated", "Weather Responsive"]
    },
    {
      icon: Shield,
      title: "Plant Protection",
      description: "Natural pest control and disease prevention",
      features: ["Eco-Friendly", "Long Lasting", "Safe for Crops"]
    },
    {
      icon: Truck,
      title: "Farm Equipment",
      description: "Modern farming tools and machinery",
      features: ["Durable", "Efficient", "Easy to Use"]
    }
  ];

  const solutionStyle = {
    padding: '4rem 0',
    backgroundColor: '#f9fafb'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '1rem'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '3rem',
    maxWidth: '600px',
    margin: '0 auto 3rem auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease'
  };

  const iconStyle = {
    width: '4rem',
    height: '4rem',
    backgroundColor: '#059669',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 1.5rem auto'
  };

  return (
    <section style={solutionStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Complete Crop Solutions</h2>
        <p style={subtitleStyle}>
          From seeds to harvest, we provide comprehensive agricultural solutions tailored to your farming needs.
        </p>
        
        <div style={gridStyle}>
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon;
            return (
              <div key={index} style={cardStyle}>
                <div style={iconStyle}>
                  <IconComponent size={32} color="white" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937' }}>
                  {solution.title}
                </h3>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                  {solution.description}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {solution.features.map((feature, featureIndex) => (
                    <li key={featureIndex} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.5rem',
                      color: '#059669',
                      fontWeight: '500'
                    }}>
                      <CheckCircle size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// BestSeller Component
function BestSeller() {
  const [hoveredProduct, setHoveredProduct] = useState(null);

  const products = [
    {
      id: 1,
      name: "Organic Tomato Seeds",
      price: "LKR 250",
      originalPrice: "LKR 300",
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=300&h=300&fit=crop",
      rating: 4.8,
      reviews: 124,
      bestseller: true
    },
    {
      id: 2,
      name: "Bio Fertilizer",
      price: "LKR 1,200",
      originalPrice: "LKR 1,500",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300&h=300&fit=crop",
      rating: 4.9,
      reviews: 89,
      bestseller: true
    },
    {
      id: 3,
      name: "Drip Irrigation Kit",
      price: "LKR 3,500",
      originalPrice: "LKR 4,200",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop",
      rating: 4.7,
      reviews: 156,
      bestseller: false
    },
    {
      id: 4,
      name: "Plant Growth Enhancer",
      price: "LKR 800",
      originalPrice: "LKR 1,000",
      image: "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=300&h=300&fit=crop",
      rating: 4.6,
      reviews: 203,
      bestseller: true
    }
  ];

  const bestSellerStyle = {
    padding: '4rem 0',
    backgroundColor: 'white'
  };

  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem'
  };

  const titleStyle = {
    fontSize: '3rem',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: '1rem'
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: '3rem'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem'
  };

  const productCardStyle = (isHovered) => ({
    backgroundColor: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: isHovered ? '0 25px 50px rgba(0,0,0,0.2)' : '0 10px 25px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
    transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
    position: 'relative'
  });

  const imageStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover'
  };

  const badgeStyle = {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    backgroundColor: '#dc2626',
    color: 'white',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.8rem',
    fontWeight: 'bold'
  };

  const contentStyle = {
    padding: '1.5rem'
  };

  const ratingStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  const priceStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '1rem'
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#059669',
    color: 'white',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <section style={bestSellerStyle}>
      <div style={containerStyle}>
        <h2 style={titleStyle}>Best Sellers</h2>
        <p style={subtitleStyle}>
          Our most popular products trusted by farmers across the country
        </p>
        
        <div style={gridStyle}>
          {products.map((product) => (
            <div
              key={product.id}
              style={productCardStyle(hoveredProduct === product.id)}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div style={{ position: 'relative' }}>
                <img src={product.image} alt={product.name} style={imageStyle} />
                {product.bestseller && (
                  <div style={badgeStyle}>Bestseller</div>
                )}
                <button style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  padding: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}>
                  <Heart size={20} color="#6b7280" />
                </button>
              </div>
              
              <div style={contentStyle}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#1f2937' }}>
                  {product.name}
                </h3>
                
                <div style={ratingStyle}>
                  <div style={{ display: 'flex', gap: '0.25rem' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"} color="#fbbf24" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                
                <div style={priceStyle}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#059669' }}>
                    {product.price}
                  </span>
                  <span style={{ fontSize: '1rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                    {product.originalPrice}
                  </span>
                </div>
                
                <button style={buttonStyle}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Footer Component (using your existing design)

export default function Footer() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const options = [
    { text: 'Learn about our services', response: 'We offer a variety of agricultural services, including plant sales and consultations.' },
    { text: 'View our projects', response: 'We are currently working on several sustainable farming projects focused on community engagement.' },
    { text: 'Meet our farmers', response: 'We collaborate with local farmers to promote sustainable agriculture and enhance productivity.' },
    { text: 'Get the latest news', response: 'Stay tuned for our latest news on sustainable farming and community events.' },
    { text: 'Learn about sustainable practices', response: 'We promote crop rotation and cover crops to maintain soil health.' },
    { text: 'Ask a common question', response: 'What crops grow best in this region?' },
    { text: 'Get plant care tips', response: 'Ensure your plants receive at least 6 hours of sunlight daily.' },
    { text: 'Learn about pest management', response: 'Natural predators can help control pest populations.' },
    { text: 'Understand weather impacts', response: 'Extreme weather can affect crop yields significantly.' },
    { text: 'Explore community engagement', response: 'Join our workshops to learn more about sustainable farming.' },
    { text: 'Contact us on WhatsApp', response: 'You can reach us on WhatsApp for more information!', action: () => window.open('https://wa.me/+94789840996', '_blank') },
  ];

  const handleChatToggle = () => {
    setShowChat(!showChat);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      addMessage(userInput, 'user');
      const response = getResponse(userInput);
      addMessage(response, 'ai');
      setUserInput('');
    }
  };

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  const getResponse = (input) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
      return 'Hello! How can I help you today?';
    } else if (lowerInput.includes('options')) {
      return 'Please select an option:';
    } else {
      return 'I am not sure how to help with that. Please type "options" to see available help topics.';
    }
  };

  const handleOptionSelect = (option) => {
    addMessage(option.text, 'user');
    addMessage(option.response, 'ai');
    if (option.action) option.action();
  };

  const footerStyles = {
    footerSection: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: '3rem 2rem',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#B0EACD',
      position: 'relative',
    },
    footerLeft: {
      flex: '1 1 25%',
      padding: '1rem',
      minWidth: '250px',
    },
    logo: {
      borderRadius: '50%',
      width: '120px',
      height: '120px',
      marginBottom: '1rem',
      backgroundColor: '#059669',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      color: 'white',
    },
    footerLeftP: {
      maxWidth: '300px',
      lineHeight: '1.6',
      fontSize: '14px',
      color: '#374151',
    },
    footerLinks: {
      flex: '1 1 25%',
      padding: '1rem',
      minWidth: '200px',
    },
    footerLinksUl: {
      listStyle: 'none',
      padding: 0,
    },
    footerLinksLi: {
      marginBottom: '0.75rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#374151',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
    },
  };

  return (
    <footer style={footerStyles.footerSection}>
      <div style={footerStyles.footerLeft}>
        <div style={footerStyles.logo}>G</div>
        <p style={footerStyles.footerLeftP}>
          Govimithuru is committed to sustainable agriculture, supporting local farmers, and promoting healthy living through organic produce.
        </p>
      </div>

      <div style={footerStyles.footerLinks}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>Quick Links</h4>
        <ul style={footerStyles.footerLinksUl}>
          {options.slice(0, 5).map((option, idx) => (
            <li
              key={idx}
              style={footerStyles.footerLinksLi}
              onClick={() => handleOptionSelect(option)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>

      <div style={footerStyles.footerLinks}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '1rem' }}>More Options</h4>
        <ul style={footerStyles.footerLinksUl}>
          {options.slice(5).map((option, idx) => (
            <li
              key={idx}
              style={footerStyles.footerLinksLi}
              onClick={() => handleOptionSelect(option)}
            >
              {option.text}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
        <button
          onClick={handleChatToggle}
          style={{
            padding: '10px 15px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            cursor: 'pointer',
          }}
        >
          {showChat ? 'Close Chat' : 'Chat with Us'}
        </button>

        {showChat && (
          <div
            style={{
              marginTop: '1rem',
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '8px',
              width: '300px',
              maxHeight: '300px',
              overflowY: 'auto',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  marginBottom: '0.5rem',
                }}
              >
                <span
                  style={{
                    backgroundColor: msg.sender === 'user' ? '#DCF8C6' : '#E5E5EA',
                    padding: '0.5rem',
                    borderRadius: '10px',
                    display: 'inline-block',
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                borderRadius: '5px',
                border: '1px solid #ccc',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.5rem',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
              }}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </footer>
  );
}
