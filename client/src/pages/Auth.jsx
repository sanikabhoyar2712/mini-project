import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../App';
import './Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsLoggedIn } = useContext(AuthContext);
  const isSignup = location.pathname === '/signup';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (isSignup && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignup && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password,
        });
        setSuccessMsg(res.data.message);
        localStorage.setItem('token', res.data.token);
        setIsLoggedIn(true);
        navigate('/');
      } catch (error) {
        setErrors({ email: 'Invalid email or password' });
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/signup', {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        setSuccessMsg(res.data.message);

        // Auto-login after signup
        const loginRes = await axios.post('http://localhost:5000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });

        localStorage.setItem('token', loginRes.data.token);
        setIsLoggedIn(true);
        navigate('/');
      } catch (error) {
        if (error.response && error.response.data.message) {
          setErrors({ email: error.response.data.message });
        } else {
          setErrors({ email: 'Registration failed' });
        }
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-content">
          <div className="auth-image-box">
            <img
              src={isSignup ? require('../assets/signup-image.jpg') : require('../assets/love-your-life.jpg')}
              alt={isSignup ? 'Sign up inspiration' : 'Love your life inspiration'}
              className="auth-inspire-img"
            />
          </div>
          <h1>{isSignup ? 'Join Our Community' : 'Welcome Back!'}</h1>
          <p>{isSignup ? 'Start your journey with us today' : 'Sign in to continue your journey'}</p>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2>{isSignup ? 'Create Account' : 'Sign In'}</h2>
            <p>{isSignup ? 'Fill in your details to get started' : 'Enter your credentials to continue'}</p>
          </div>

          {successMsg && <div className="success-message">{successMsg}</div>}

          <form onSubmit={isSignup ? handleSignup : handleLogin} className="auth-form">
            {isSignup && (
              <div className="form-group">
                <div className="input-icon">
                  <i className="fas fa-user"></i>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={errors.name ? 'error' : ''}
                  />
                </div>
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            )}

            <div className="form-group">
              <div className="input-icon">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={errors.email ? 'error' : ''}
                />
              </div>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <div className="input-icon">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={errors.password ? 'error' : ''}
                />
              </div>
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            {isSignup && (
              <div className="form-group">
                <div className="input-icon">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className={errors.confirmPassword ? 'error' : ''}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            <button type="submit" className="auth-button">
              {isSignup ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="social-auth">
            <button className="social-button google">
              <i className="fab fa-google"></i>
              Google
            </button>
            <button className="social-button facebook">
              <i className="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>

          <div className="auth-footer">
            <p>
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <NavLink to={isSignup ? "/login" : "/signup"} className="auth-switch-link">
                {isSignup ? "Sign In" : "Sign Up"}
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
