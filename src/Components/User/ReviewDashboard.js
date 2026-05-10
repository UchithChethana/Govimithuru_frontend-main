import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await axios.get('https://govimithuru-backend.onrender.com/reviews/'); // Adjust this path if necessary
      // Add automatically generated item IDs to each review for display
      const reviewsWithFakeItemId = response.data.map(review => ({
        ...review,
        itemId: generateFakeItemId() // Generate a unique fake item ID
      }));
      setReviews(reviewsWithFakeItemId);
      setError(''); // Clear any previous errors
    } catch (err) {
      setError("Error fetching reviews: " + err.message);
      setReviews([]); // Clear reviews on error
    }
  };

  // Function to generate a unique fake item ID
  const generateFakeItemId = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const randomLetters = Array.from({ length: 3 }, () => letters.charAt(Math.floor(Math.random() * letters.length))).join('');
    const randomNumbers = Array.from({ length: 3 }, () => numbers.charAt(Math.floor(Math.random() * numbers.length))).join('');
    return `${randomLetters}${randomNumbers}`; // E.g., 'Rie213'
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Reviews</h1>
      {error && <p style={styles.error}>{error}</p>}
      <ul style={styles.reviewList}>
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <li key={review._id} style={styles.reviewItem}>
              <strong>{review.reviewerName}</strong> (Rating: {review.rating})<br />
              Item ID: <span style={styles.itemId}>{review.itemId}</span><br />
              <span>{review.reviewText}</span>
            </li>
          ))
        ) : (
          <p style={styles.noReviews}>No reviews available.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  reviewList: {
    listStyleType: 'none',
    padding: 0,
  },
  reviewItem: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#fff',
  },
  itemId: {
    fontStyle: 'italic',
    color: '#007BFF', // Bootstrap primary color
  },
  noReviews: {
    textAlign: 'center',
    color: '#666',
  },
};

export default ReviewDashboard;
