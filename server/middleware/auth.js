import jwt from 'jsonwebtoken';

const auth = (req, res, next) => { 
    const token = req.headers.authorization; // Supports Bearer <token>

    try {
         jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.json({ success: false, message: 'Invalid token' });
    }
};

export default auth; 