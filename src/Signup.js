import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from './Components/ui/img/logo.png';
import backgroundImage from './Components/ui/img/1663151489748.png';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    repassword: ''
  });

  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';
    switch (name) {
      case 'firstname':
      case 'lastname':
        const namePattern = /^[A-Za-z\s]*$/;
        if (!namePattern.test(value)) {
          errorMessage = `${name.charAt(0).toUpperCase() + name.slice(1)} can only contain letters and spaces.`;
        }
        break;
      case 'username':
        const usernamePattern = /^[a-zA-Z0-9_]{3,16}$/;
        if (!usernamePattern.test(value)) {
          errorMessage = "Username must be 3-16 characters and can only contain letters, numbers, and underscores.";
        }
        break;
      case 'email':
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          errorMessage = "Invalid email format.";
        }
        break;
      case 'password':
        if (value.length < 8) {
          errorMessage = "Password must be at least 8 characters long.";
        }
        break;
      case 'repassword':
        if (value !== formData.password) {
          errorMessage = "Passwords do not match.";
        }
        break;
      default:
        break;
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleKeyPress = (e, type) => {
    const allowedEmailChars = /^[a-zA-Z0-9@._-]*$/;
    const isLetterOrSpecialChar = type === 'email' ? allowedEmailChars.test(e.key) : /^[A-Za-z\s]*$/.test(e.key);
    if (!isLetterOrSpecialChar) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error)) {
      setFormMessage("Please fix the errors in the form.");
      return;
    }
    try {
      const response = await axios.post('https://govimithuru-backend.onrender.com/auth/signup', formData);
      setFormMessage(response.data);
      navigate('/login');
    } catch (error) {
      setFormMessage("Email or Username already exists");
    }
  };

  // Inline premium styles
  const pageStyle = {
    backgroundImage: `linear-gradient(rgba(8,123,91,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',       // Changed from height to minHeight for better responsiveness
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
    padding: '1rem',
    overflowY: 'auto',        // Enables vertical scroll if needed
  };

  const formStyle = {
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: '2rem 2rem',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(8, 123, 91, 0.25)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'fadeInUp 0.8s ease forwards',
    textAlign: 'center',
    boxSizing: 'border-box',   // Important for padding + width handling
  };

  const logoStyle = {
    width: '110px',
    marginBottom: '20px',
    filter: 'drop-shadow(0 0 5px rgba(8, 123, 91, 0.8))',
  };

  const headingStyle = {
    marginBottom: '25px',
    fontWeight: '700',
    fontSize: '2.2rem',
    color: '#087B5B',
    letterSpacing: '1.2px',
  };

  const inputStyle = {
    width: '100%',
    padding: '14px 15px',
    marginBottom: '15px',
    borderRadius: '10px',
    border: '2px solid #ddd',
    fontSize: '16px',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    outline: 'none',
    fontWeight: '500',
    color: '#333',
  };

  const inputFocusStyle = {
    borderColor: '#087B5B',
    boxShadow: '0 0 8px rgba(8, 123, 91, 0.6)',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#087B5B',
    color: 'white',
    fontWeight: '700',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    fontSize: '17px',
    boxShadow: '0 6px 15px rgba(8, 123, 91, 0.5)',
    marginBottom: '15px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#06593f',
    transform: 'scale(1.05)',
  };

  const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6c757d',
  };

  const messageStyle = {
    color: formMessage.includes('exists') ? '#e63946' : '#2a9d8f',
    marginBottom: '10px',
    fontWeight: '600',
    fontSize: '1rem',
  };

  const errorTextStyle = {
    color: '#e63946',
    fontSize: '0.9rem',
    marginBottom: '10px',
    fontWeight: '600',
    alignSelf: 'flex-start',
  };

  // Manage focus for inputs
  const [focusField, setFocusField] = useState(null);

  return (
    <div style={pageStyle}>
      <form
        onSubmit={handleSubmit}
        style={formStyle}
        noValidate
        autoComplete="off"
        aria-label="Sign up form"
      >
        <img src={logo} alt="Logo" style={logoStyle} />
        <h2 style={headingStyle}>Sign Up</h2>

        {formMessage && (
          <p role="alert" aria-live="assertive" style={messageStyle}>
            {formMessage}
          </p>
        )}

        {['firstname', 'lastname', 'username', 'email', 'password', 'repassword'].map((field) => (
          <React.Fragment key={field}>
            <input
              type={
                field.includes('password') ? 'password' :
                field === 'email' ? 'email' : 'text'
              }
              name={field}
              placeholder={
                field === 'firstname' ? 'First Name' :
                field === 'lastname' ? 'Last Name' :
                field === 'username' ? 'Username' :
                field === 'email' ? 'Email' :
                field === 'password' ? 'Password' :
                'Re-enter Password'
              }
              onChange={handleChange}
              onKeyPress={(e) => handleKeyPress(e, field === 'email' ? 'email' : 'name')}
              required
              style={{
                ...inputStyle,
                ...(focusField === field ? inputFocusStyle : {})
              }}
              onFocus={() => setFocusField(field)}
              onBlur={() => setFocusField(null)}
              aria-invalid={!!errors[field]}
              aria-describedby={`${field}-error`}
              autoComplete={field === 'password' || field === 'repassword' ? 'new-password' : 'off'}
            />
            {errors[field] && (
              <span
                id={`${field}-error`}
                style={errorTextStyle}
                role="alert"
              >
                {errors[field]}
              </span>
            )}
          </React.Fragment>
        ))}

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, buttonStyle)
          }
        >
          Sign Up
        </button>

        <button
          type="button"
          style={loginButtonStyle}
          onClick={() => navigate('/login')}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, {
              backgroundColor: '#565e64',
              transform: 'scale(1.05)',
            })
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, loginButtonStyle)
          }
        >
          Login
        </button>
      </form>

      <style>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive tweak for small screens */
        @media (max-width: 480px) {
          form {
            padding: 1.5rem 1rem !important;
            max-width: 90% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
