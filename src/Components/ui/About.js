import React from 'react';
import img1 from "./img/1557-e-commerce-groups-welcome-rush-of-agricultural-products (1).jpg";
import img2 from "./img/WhatsApp Image 2024-09-21 at 01.51.31_83da0e81.jpg";
import img3 from "./img/WhatsApp Image 2024-09-21 at 01.51.31_496dcb39.jpg";
import img4 from "./img/WhatsApp Image 2024-09-21 at 01.51.31_d04bcecf.jpg";
import img5 from "./img/WhatsApp Image 2024-09-21 at 01.51.32_4fc912c3.jpg";

const About = () => {
    return (
        <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: '#fdfdfd', color: '#222' }}>
            {/* Banner Section */}
            <section style={{
                background: 'linear-gradient(to right, #087B5B, #087B5B)',
                color: 'white',
                textAlign: 'center',
                padding: '60px 20px'
            }}>
                <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 'bold' }}>About Us</h1>
            </section>

            {/* Content Section */}
            <section style={{ display: 'flex', flexWrap: 'wrap', padding: '60px 5%', alignItems: 'center', gap: '40px' }}>
                <div style={{ flex: '1 1 500px' }}>
                    <h2 style={{ fontSize: '1.2rem', color: '#16a34a', marginBottom: '10px' }}>Get to Know Us</h2>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '20px' }}>The Best Agriculture Market</h1>
                    <p style={{ lineHeight: '1.6', marginBottom: '20px', fontSize: '1.05rem' }}>
                        In the world of agriculture, the landscape is ever-evolving, with numerous markets showcasing a rich tapestry of produce. However, many of these markets have undergone significant transformations over time.
                        <br /><br />
                        The pulse of the industry beats strongly in regions where innovation meets tradition, driving a dynamic exchange of goods. From the rolling fields of grain to vibrant farmer’s markets, the agriculture sector continually adapts to meet the needs of a changing world.
                    </p>
                    <ul style={{ paddingLeft: '20px', marginBottom: '30px', color: '#555' }}>
                        <li style={{ marginBottom: '10px' }}>🌾 Diverse Offerings: Variety of crops and livestock.</li>
                        <li style={{ marginBottom: '10px' }}>🌱 Sustainable Practices: Eco-friendly farming techniques.</li>
                        <li style={{ marginBottom: '10px' }}>🚚 Market Access: Direct connection between farmers and consumers.</li>
                    </ul>
                    <button style={{
                        padding: '12px 24px',
                        backgroundColor: '#16a34a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                        transition: 'background 0.3s ease'
                    }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#15803d'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#16a34a'}
                    >
                        Discover More
                    </button>
                </div>
                <div style={{ flex: '1 1 400px', textAlign: 'center' }}>
                    <img src={img1} alt="Agriculture Market" style={{
                        maxWidth: '100%',
                        borderRadius: '12px',
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
                    }} />
                </div>
            </section>

            {/* Team Members Section */}
            <section style={{ padding: '60px 5%', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '40px' }}>Meet Our Farmers</h2>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '20px'
                }}>
                    {[img2, img3, img4, img5].map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt={`Farmer ${index + 1}`}
                            style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                transition: 'transform 0.3s ease',
                                cursor: 'pointer'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;
