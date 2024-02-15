import jwt from 'jsonwebtoken';
import { errorHandler }from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        return next(errorHandler('Please login to access this resource', 401));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler('Token is not valid', 403));
        }
        req.user = user;
        next();
    });
    
}