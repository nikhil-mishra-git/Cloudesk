import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = async ({ payload }) => {
    return jwt.sign({ payload }, JWT_SECRET, {
        expiresIn: '7d',
    });
};

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token || typeof token !== 'string') {
            return res.status(401).json({ error: 'Token not found or invalid format' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        req.userData = decoded.payload;
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};

export { generateToken, authMiddleware };
