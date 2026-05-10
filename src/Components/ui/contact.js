import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome

const Contact = () => {
  const styles = {
    page: {
      backgroundColor: 'white',
      color: '#087B5B',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: '2rem',
      maxWidth: 900,
      margin: '0 auto',
      boxSizing: 'border-box',
    },
    headerBanner: {
      backgroundColor: '#087B5B',
      color: 'white',
      padding: '1.5rem 1rem',
      borderRadius: '8px',
      textAlign: 'center',
      marginBottom: '2rem',
      fontWeight: '700',
      fontSize: '2rem',
      letterSpacing: '1.2px',
      boxShadow: '0 4px 6px rgba(8, 123, 91, 0.4)',
    },
    contentSection: {
      display: 'flex',
      gap: '2rem',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: '2rem',
    },
    infoBox: {
      flex: '1 1 280px',
      backgroundColor: '#f9f9f9',
      padding: '1.5rem',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(8, 123, 91, 0.1)',
      color: '#045637',
      minWidth: '280px',
    },
    infoBoxHeader: {
      borderBottom: `2px solid #087B5B`,
      paddingBottom: '0.5rem',
      marginBottom: '1rem',
      fontWeight: '700',
      fontSize: '1.4rem',
    },
    boldText: {
      fontWeight: '600',
    },
    icon: {
      color: '#087B5B',
      marginRight: '0.5rem',
    },
    mapSection: {
      textAlign: 'center',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(8, 123, 91, 0.2)',
    },
    iframe: {
      width: '100%',
      height: '450px',
      border: 'none',
      borderRadius: '10px',
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.headerBanner}>
        Contact
      </div>

      <div style={styles.contentSection}>
        <div style={styles.infoBox}>
          <h2 style={styles.infoBoxHeader}>About</h2>
          <p style={styles.boldText}>
            At Govi Mothiru Agriculture Shop, we are dedicated to providing the best products and services for all your agricultural needs.
            Whether you're a seasoned farmer or just starting out, our knowledgeable team is here to assist you with expert advice and high-quality supplies.
            For inquiries, product information, or assistance, feel free to reach out to us using the contact details below.
            We value your feedback and are committed to helping you grow your agricultural endeavors.
          </p>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.infoBoxHeader}>Contact</h2>
          <p>
            <i className="fas fa-phone-alt" style={styles.icon}></i>
            <span style={styles.boldText}>Phone:</span> +94789840996
          </p>
          <p>
            <i className="fas fa-envelope" style={styles.icon}></i>
            <span style={styles.boldText}>Email:</span> info@govimothiru.com
          </p>
          <p style={{ marginTop: '1rem' }}>
            <span style={styles.boldText}>Working Hours</span><br />
            Monday - Friday: 9:00 AM - 6:00 PM<br />
            Saturday: 10:00 AM - 4:00 PM<br />
            Sunday: Closed
          </p>
        </div>

        <div style={styles.infoBox}>
          <h2 style={styles.infoBoxHeader}>Address</h2>
          <p>
            <i className="fas fa-map-marker-alt" style={styles.icon}></i>
            <span style={styles.boldText}>Kahatagasdigiliya, Anuradhapura</span>
          </p>
        </div>
      </div>

      <div style={styles.mapSection}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1563406.706583331!2d81.80043790531797!3d8.357991192862717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae17a8edb80f641%3A0x3e4b4f2a7f97e6d!2sKahatagasdigiliya%2C%20Sri%20Lanka!5e0!3m2!1sen!2sau!4v1602141019053!5m2!1sen!2sau"
          title="Location"
          style={styles.iframe}
          allowFullScreen=""
          loading="lazy"
          aria-hidden="false"
          tabIndex="0"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
