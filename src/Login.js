import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from './Components/ui/img/logo.png';
import backgroundImage from './Components/ui/img/background.jpg';

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMessage = '';

    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value) && value !== '') {
        errorMessage = 'Invalid email format.';
      }
    }

    if (name === 'password') {
      if (value.length < 8) {
        errorMessage = 'Password must be at least 8 characters long.';
      }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some((error) => error)) {
      setServerMessage('Please fix the errors in the form.');
      return;
    }

    try {
      const response = await axios.post(
        `https://govimithuru-backend.onrender.com/auth/login`,
        credentials
      );
      setServerMessage(response.data.message);

      Cookies.set('user', JSON.stringify(response.data), { expires: 10 / (24 * 60) });
      localStorage.setItem('username', response.data.username);
      Cookies.set('firstName', response.data.firstName, { expires: 10 / (24 * 60) });

      if (credentials.email === 'admin2232@gmail.com' && credentials.password === 'R200232r#') {
        Cookies.set('role', 'admin', { expires: 10 / (24 * 60) });
        navigate('/admin/inventory');
      } else {
        onLogin();
        localStorage.setItem('email', credentials.email);
        navigate('/Home');
      }
    } catch (error) {
      setServerMessage('Email or Password are incorrect. Please try again.');
    }
  };

  const loginWithGoogle = () => {
    window.open('https://govimithuru-backend.onrender.com/auth/google', '_self');
  };

  // Inline CSS styles with animations and premium design
  const pageStyle = {
    backgroundImage: `linear-gradient(rgba(8,123,91,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
    padding: '1rem',
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '3rem 2.5rem',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(8, 123, 91, 0.25)',
    width: '100%',
    maxWidth: '380px',
    textAlign: 'center',
    animation: 'fadeInUp 0.8s ease forwards',
  };

  const logoStyle = {
    marginBottom: '20px',
    width: '110px',
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

  const linkStyle = {
    color: '#087B5B',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline',
  };

  const errorTextStyle = {
    color: '#e63946',
    fontSize: '0.9rem',
    marginBottom: '10px',
    fontWeight: '600',
  };

  const messageStyle = (isError) => ({
    color: isError ? '#e63946' : '#2a9d8f',
    marginTop: '12px',
    fontWeight: '600',
    fontSize: '1rem',
  });

  // State for managing input focus styles
  const [focusField, setFocusField] = useState(null);

  return (
    <div style={pageStyle}>
      <form
        onSubmit={handleSubmit}
        style={formStyle}
        noValidate
        autoComplete="off"
        aria-label="Login form"
      >
        <img src={logo} alt="Logo" style={logoStyle} />

        <h2 style={headingStyle}>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{
            ...inputStyle,
            ...(focusField === 'email' ? inputFocusStyle : {}),
          }}
          onFocus={() => setFocusField('email')}
          onBlur={() => setFocusField(null)}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
        {errors.email && (
          <span id="email-error" style={errorTextStyle}>
            {errors.email}
          </span>
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{
            ...inputStyle,
            ...(focusField === 'password' ? inputFocusStyle : {}),
          }}
          onFocus={() => setFocusField('password')}
          onBlur={() => setFocusField(null)}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
        {errors.password && (
          <span id="password-error" style={errorTextStyle}>
            {errors.password}
          </span>
        )}

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
          Login
        </button>

        <button
          type="button"
          onClick={loginWithGoogle}
          style={buttonStyle}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, buttonStyle)
          }
          aria-label="Sign in with Google"
        >
          Sign In With Google
        </button>

        {serverMessage && (
          <div
            style={messageStyle(serverMessage.toLowerCase().includes('incorrect'))}
            role="alert"
            aria-live="assertive"
          >
            {serverMessage}
          </div>
        )}

        <div style={{ marginTop: '20px', fontSize: '0.95rem' }}>
          <p>
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              style={linkStyle}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') navigate('/signup');
              }}
            >
              Sign Up
            </span>
          </p>
        </div>

      </form>

      {/* Keyframe animation for fadeInUp */}
      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default Login;
