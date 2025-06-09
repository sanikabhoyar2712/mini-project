import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === '/login');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!isLogin && !formData.name) newErrors.name = 'Name is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isLogin) {
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: formData.email,
            password: formData.password,
          });
          setSuccessMsg(res.data.message);
          localStorage.setItem('token', res.data.token);


          // Clear success message after 3 seconds
          setTimeout(() => {
            setSuccessMsg('');
            navigate('/');
          }, 3000);
        } catch (error) {
          setErrors({ email: 'Invalid email or password' });
        }
      
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        } else {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    setSuccessMsg(res.data.message);

    // ✅ ADD this line to store token
    localStorage.setItem('token', res.data.token);

    // ✅ Redirect to home page after signup
    setTimeout(() => {
      setSuccessMsg('');
      navigate('/');
    }, 1500);

  } catch (error) {
    setErrors({ email: error.response?.data?.message || 'Registration failed' });
  }
}

          {isLogin ? 'Login' : 'Sign Up'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
            )}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
          </div>

          {successMsg && (
            <div className="text-green-600 text-sm text-center">
              {successMsg}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>

          <div className="text-sm text-center">
          <button
  type="button"
  onClick={() => {
    const newPath = isLogin ? '/signup' : '/login';
    navigate(newPath); // Update the URL
    setIsLogin(!isLogin); // Toggle form
    setFormData({ name: '', email: '', password: '' }); // Clear form
    setErrors({});
    setSuccessMsg('');
  }}
  className="font-medium text-indigo-600 hover:text-indigo-500"
>
  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
</button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default Auth; 