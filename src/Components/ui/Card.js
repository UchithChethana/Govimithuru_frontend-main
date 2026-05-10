import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa'; // Importing icons
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [availability, setAvailability] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://govimithuru-backend.onrender.com/card/')
      .then(response => {
        setCartItems(response.data);
        const initialQuantities = {};
        const initialChecked = {};
        const initialAvailability = {};
        response.data.forEach(item => {
          initialQuantities[item._id] = item.quantityc || 1;
          initialChecked[item._id] = false;
          initialAvailability[item._id] = item.available || 0;
        });
        setQuantities(initialQuantities);
        setCheckedItems(initialChecked);
        setAvailability(initialAvailability);
      })
      .catch(err => {
        console.error('Error fetching cart items:', err);
        toast.error('Error fetching cart items');
      });
  }, []);

  const handleQuantityChange = (id, change) => {
    setQuantities(prevQuantities => {
      const newQuantity = Math.max(1, prevQuantities[id] + change);
      return {
        ...prevQuantities,
        [id]: newQuantity,
      };
    });
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => checkedItems[item._id]);
    
    if (selectedItems.length === 0) {
      toast.error('Please select at least one item to proceed to checkout.');
      return;
    }

    const orderSummary = selectedItems.map(item => ({
      id: item._id,
      itemName: item.itemNamec,
      quantity: quantities[item._id],
      price: item.pricec,
      totalPrice: (item.pricec * quantities[item._id]),
    }));

    sessionStorage.setItem('orderSummary', JSON.stringify(orderSummary));

    const updatePromises = orderSummary.map(item => {
      return axios.put(`https://govimithuru-backend.onrender.com/card/update/${item.id}`, { quantityc: item.quantity })
        .then(() => {
          console.log(`Quantity for item ${item.id} updated successfully`);
        })
        .catch(err => {
          console.error(`Error updating quantity for item ${item.id}:`, err);
          toast.error(`Error updating quantity for item ${item.id}`);
        });
    });

    Promise.all(updatePromises)
      .then(() => {
        const deletePromises = selectedItems.map(item => {
          return axios.delete(`https://govimithuru-backend.onrender.com/card/delete/${item._id}`)
            .then(() => {
              console.log(`Item ${item._id} deleted successfully`);
              toast.success(`Item ${item.itemNamec} removed from cart.`);
            })
            .catch(err => {
              console.error(`Error deleting item ${item._id}:`, err);
              toast.error(`Error deleting item ${item._id}`);
            });
        });

        return Promise.all(deletePromises);
      })
      .then(() => {
        navigate('/order-summary');
      })
      .catch(err => {
        console.error('Error during checkout process:', err);
        toast.error('An error occurred during checkout.');
      });
  };

  const handleSelectItem = (id) => {
    setCheckedItems(prevCheckedItems => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  };

  const removeItem = (id) => {
    axios.delete(`https://govimithuru-backend.onrender.com/card/delete/${id}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item._id !== id));
        toast.success('Item removed from cart.');
      })
      .catch(err => {
        console.error('Error removing item from cart:', err);
        toast.error('Error removing item from cart.');
      });
  };

  const calculateTotal = () => {
    return cartItems.reduce((sum, item) => {
      if (checkedItems[item._id]) {
        return sum + (item.pricec * quantities[item._id]);
      }
      return sum;
    }, 0).toFixed(2);
  };

  return (
    <div 
      className="cart-page" 
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        padding: '2rem',
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: '#F5F9F7',
        minHeight: '100vh',
        gap: '2rem'
      }}
    >
      {/* Cart Items Section */}
      <div className="cart-items" style={{ flex: '3', minWidth: '320px' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: '1rem', 
          color: '#059669', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem' 
        }}>
          My Cart <FaShoppingCart />
        </h2>

        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div key={item._id} className="cart-item" style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1rem',
              borderRadius: '15px',
              backgroundColor: '#fff',
              marginBottom: '1rem',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              position: 'relative',
              transition: 'transform 0.3s ease',
              cursor: 'default',
            }}>
              <input 
                type="checkbox" 
                checked={checkedItems[item._id]} 
                onChange={() => handleSelectItem(item._id)} 
                style={{ transform: 'scale(1.3)', marginTop: '1rem' }}
              />
              <div className="cart-item-info" style={{ flex: 1 }}>
                <img 
                  src={`data:image/jpeg;base64,${item.imagec}`} 
                  alt={item.itemNamec} 
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '0.5rem',
                    border: '2px solid #059669',
                    boxShadow: '0 4px 10px rgba(5, 150, 105, 0.3)'
                  }}
                />
                <h3 style={{ margin: '0.5rem 0', fontSize: '18px', color: '#1F2937' }}>{item.itemNamec}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#6B7280' }}>Category: {item.categoryc}</p>
                <p style={{ fontSize: '15px', fontWeight: '500', color: '#059669' }}>Price: Rs:{item.pricec.toFixed(2)}</p>

                <div className="quantity-control" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <button 
                    onClick={() => handleQuantityChange(item._id, -1)}
                    disabled={quantities[item._id] <= 1}
                    style={{
                      padding: '0.3rem 0.6rem',
                      border: 'none',
                      backgroundColor: quantities[item._id] <= 1 ? '#E5E7EB' : '#F3F4F6',
                      borderRadius: '5px',
                      cursor: quantities[item._id] <= 1 ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    aria-label="Decrease quantity"
                  >
                    <FaMinus />
                  </button>
                  <span style={{ fontSize: '16px', width: '25px', textAlign: 'center' }}>{quantities[item._id]}</span>
                  <button 
                    onClick={() => handleQuantityChange(item._id, 1)}
                    disabled={quantities[item._id] >= availability[item._id]}
                    style={{
                      padding: '0.3rem 0.6rem',
                      border: 'none',
                      backgroundColor: quantities[item._id] >= availability[item._id] ? '#FEE2E2' : '#DCFCE7',
                      borderRadius: '5px',
                      cursor: quantities[item._id] >= availability[item._id] ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.3s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}
                    aria-label="Increase quantity"
                  >
                    <FaPlus />
                    {quantities[item._id] >= availability[item._id] && (
                      <span style={{
                        position: 'absolute',
                        top: '-18px',
                        right: '-10px',
                        fontSize: '10px',
                        color: '#B91C1C',
                        fontWeight: 'bold',
                        backgroundColor: '#FEE2E2',
                        padding: '2px 5px',
                        borderRadius: '8px',
                        whiteSpace: 'nowrap',
                      }}>
                        Max reached
                      </span>
                    )}
                  </button>
                </div>
                <p style={{ marginTop: '0.3rem', fontSize: '13px', color: '#6B7280' }}>Available: {availability[item._id]}</p>
              </div>
              <div 
                className="remove-item" 
                onClick={() => removeItem(item._id)} 
                style={{
                  cursor: 'pointer',
                  color: '#EF4444',
                  fontSize: '22px',
                  marginTop: '0.5rem',
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  transition: 'color 0.3s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#B91C1C'}
                onMouseLeave={e => e.currentTarget.style.color = '#EF4444'}
                aria-label={`Remove ${item.itemNamec} from cart`}
              >
                <FaTrash />
              </div>
            </div>
          ))
        ) : (
          <p style={{ fontSize: '16px', color: '#6B7280' }}>Your cart is empty</p>
        )}
      </div>

      {/* Cart Summary Section */}
      <div className="cart-summary" style={{
        flex: '1',
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        height: 'fit-content',
        minWidth: '280px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', color: '#059669', marginBottom: '1rem' }}>TOTAL</h3>
          <p style={{ fontSize: '16px', marginBottom: '0.5rem' }}>
            Subtotal: <strong>Rs:{calculateTotal()}</strong>
          </p>
          <p style={{ fontSize: '16px', marginBottom: '1.5rem' }}>
            Delivery: <strong>Free</strong>
          </p>
        </div>
        <button 
          className="checkout-btn" 
          onClick={handleCheckout} 
          style={{
            backgroundColor: '#059669',
            color: 'white',
            padding: '0.75rem 1.5rem',
            fontSize: '16px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            fontWeight: '600',
            boxShadow: '0 4px 10px rgba(5, 150, 105, 0.4)'
          }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = '#047857'}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = '#059669'}
          aria-label="Proceed to checkout"
        >
          <FaShoppingCart /> Check Out
        </button>
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default Cart;
