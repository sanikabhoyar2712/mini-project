const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'thisisoursecret';

const protect = async (req, res, next) => {
  try {
    console.log('Auth middleware - Headers:', req.headers);
    
    const authHeader = req.headers.authorization;
    console.log('Auth header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No token provided or invalid format');
      return res.status(401).json({ 
        error: 'Authentication required',
        message: 'Please log in to access this feature'
      });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token received:', token ? 'Present' : 'Missing');

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Token decoded successfully:', decoded);
      
      if (!decoded.id) {
        console.log('Token missing user ID');
        return res.status(401).json({ 
          error: 'Invalid token',
          message: 'Please log in again'
        });
      }

      req.user = { id: decoded.id };
      next();
    } catch (jwtError) {
      console.error('JWT verification failed:', jwtError.message);
      return res.status(401).json({ 
        error: 'Invalid token',
        message: 'Your session has expired. Please log in again.'
      });
    }
  } catch (err) {
    console.error('Auth middleware error:', err);
    return res.status(500).json({ 
      error: 'Server error',
      message: 'Authentication failed. Please try again.'
    });
  }
};

module.exports = protect;
