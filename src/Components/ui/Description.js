import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaStar } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Description() {
  const { id } = useParams();
  const [seedItem, setSeedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ reviewerName: '', reviewText: '', rating: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://govimithuru-backend.onrender.com/showcase/get/${id}`)
      .then((res) => setSeedItem(res.data.showcaseItem))
      .catch((err) => {
        console.error('Error fetching seed item:', err);
        toast.error('Error fetching item details');
      });

    axios.get(`https://govimithuru-backend.onrender.com/reviews/item/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error('Error fetching reviews:', err));
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(value >= 1 ? value : 1);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const getDiscountedPrice = (price, discount) => price - (price * (discount / 100));

  const addToCart = () => {
    if (!seedItem) return toast.error('Item details are not available');
    const discountedPrice = getDiscountedPrice(seedItem.price, seedItem.discount);

    axios.post('https://govimithuru-backend.onrender.com/card/add', {
      itemNamec: seedItem.name,
      categoryc: seedItem.category,
      pricec: discountedPrice.toFixed(2),
      quantityc: quantity,
      imagec: seedItem.imageBase64
    })
    .then(res => {
      toast.success('Item added to cart successfully');
      navigate('/cart');
    })
    .catch(err => {
      console.error('Error adding to cart:', err);
      toast.error('Error adding item to cart');
    });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const submitReview = () => {
    if (!newReview.reviewerName || !newReview.reviewText)
      return toast.error('Please fill out all fields');

    axios.post('https://govimithuru-backend.onrender.com/reviews/add', {
      itemId: id,
      reviewerName: newReview.reviewerName,
      reviewText: newReview.reviewText,
      rating: newReview.rating,
    })
    .then(() => {
      toast.success('Review added successfully');
      setNewReview({ reviewerName: '', reviewText: '', rating: 1 });
      axios.get(`https://govimithuru-backend.onrender.com/reviews/item/${id}`)
        .then((res) => setReviews(res.data));
    })
    .catch(err => {
      console.error('Error adding review:', err);
      toast.error('Error adding review');
    });
  };

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  const averageRating = calculateAverageRating();

  return (
    <div style={{
      fontFamily: "'Poppins', sans-serif",
      backgroundColor: '#f9fafb',
      padding: '2rem',
      color: '#1f2937',
      maxWidth: '1000px',
      margin: '0 auto',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      animation: 'fadeIn 0.8s ease-out'
    }}>
      {seedItem ? (
        <>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '2rem',
            alignItems: 'flex-start'
          }}>
            <img
              src={`data:image/jpeg;base64,${seedItem.imageBase64}`}
              alt={seedItem.name}
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '20px',
                objectFit: 'cover',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                transition: 'transform 0.4s ease-in-out',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />

            <div style={{ flex: 1 }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                marginBottom: '0.5rem',
                color: '#065f46'
              }}>
                {seedItem.name}
              </h2>
              <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {seedItem.description}
              </p>

              <div style={{ marginBottom: '1.2rem' }}>
                {seedItem.discount > 0 ? (
                  <>
                    <p style={{ textDecoration: 'line-through', color: '#9ca3af' }}>
                      Rs: {seedItem.price.toFixed(2)}
                    </p>
                    <p style={{ color: '#059669', fontWeight: 'bold' }}>
                      Rs: {getDiscountedPrice(seedItem.price, seedItem.discount).toFixed(2)}
                      <span style={{ marginLeft: '10px', color: '#10b981', fontWeight: '600' }}>
                        ({seedItem.discount}% off)
                      </span>
                    </p>
                  </>
                ) : (
                  <p style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
                    Rs: {seedItem.price.toFixed(2)}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <label htmlFor="quantity" style={{ fontWeight: '500' }}>Quantity:</label>
                <button onClick={decreaseQuantity} style={qtyBtn}>−</button>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  min="1"
                  onChange={handleQuantityChange}
                  style={{
                    width: '60px',
                    textAlign: 'center',
                    fontSize: '1rem',
                    padding: '0.3rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                  }}
                />
                <button onClick={increaseQuantity} style={qtyBtn}>+</button>
              </div>

              <button onClick={addToCart} style={{
                backgroundColor: '#059669',
                color: 'white',
                padding: '0.7rem 1.5rem',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 6px 18px rgba(5,150,105,0.4)',
              }}>
                <FaShoppingCart /> Add to Cart
              </button>
            </div>
          </div>

          {/* Reviews Section */}
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '600', marginBottom: '1rem' }}>Reviews</h3>
            <div style={{ marginBottom: '1rem', color: '#f59e0b' }}>
              Average Rating: {averageRating} <FaStar />
            </div>

            {reviews.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {reviews.map(r => (
                  <li key={r._id} style={{
                    backgroundColor: '#fff',
                    borderRadius: '12px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                    transition: 'all 0.3s ease',
                  }}>
                    <strong>{r.reviewerName}</strong> - {r.rating} <FaStar style={{ color: '#facc15' }} />
                    <p style={{ margin: '0.5rem 0' }}>{r.reviewText}</p>
                    <small style={{ color: '#6b7280' }}>{new Date(r.createdAt).toLocaleDateString()}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet</p>
            )}

            {/* Add Review */}
            <div style={{ marginTop: '2rem' }}>
              <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Add a Review</h4>

              <input
                type="text"
                name="reviewerName"
                placeholder="Your Name"
                value={newReview.reviewerName}
                onChange={handleReviewChange}
                style={inputStyle}
              />
              <textarea
                name="reviewText"
                placeholder="Write your review here..."
                value={newReview.reviewText}
                onChange={handleReviewChange}
                style={{ ...inputStyle, height: '100px' }}
              />
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                value={newReview.rating}
                onChange={handleReviewChange}
                style={inputStyle}
              />
              <button onClick={submitReview} style={{
                ...qtyBtn,
                backgroundColor: '#10b981',
                color: 'white',
                fontWeight: 'bold',
                marginTop: '1rem'
              }}>
                <FaStar /> Submit Review
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <ToastContainer />
    </div>
  );
}

// Shared styles
const qtyBtn = {
  backgroundColor: '#e0f2f1',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '10px',
  fontSize: '1.2rem',
  cursor: 'pointer',
  fontWeight: '600'
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  borderRadius: '10px',
  border: '1px solid #d1d5db',
  marginBottom: '1rem',
  fontSize: '1rem',
};

export default Description;
