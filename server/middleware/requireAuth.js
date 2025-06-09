const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = async (req, res, next) => {
    try {
        // get token from header
        const { authorization } = req.headers;

        if (!authorization) {
            console.log('Auth failed: No authorization header');
            return res.status(401).json({ error: 'Authorization token required' });
        }

        const token = authorization.split(' ')[1];
        if (!token) {
            console.log('Auth failed: Invalid token format');
            return res.status(401).json({ error: 'Invalid token format' });
        }

        try {
            const { id } = jwt.verify(token, process.env.JWT_SECRET || 'thisisoursecret');
            const user = await User.findById(id).select('_id name email');
            
            if (!user) {
                console.log('Auth failed: User not found');
                return res.status(401).json({ error: 'User not found' });
            }

            req.user = user;
            console.log('Auth successful for user:', { id: user._id, email: user.email });
            next();
        } catch (error) {
            console.error('Token verification failed:', {
                message: error.message,
                name: error.name
            });
            return res.status(401).json({ error: 'Invalid token' });
        }
    } catch (error) {
        console.error('Auth middleware error:', {
            message: error.message,
            stack: error.stack,
            name: error.name
        });
        res.status(500).json({ 
            error: 'Authentication failed',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

module.exports = requireAuth; 