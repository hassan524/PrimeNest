import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthRequest extends Request {
    user?: any;
}

const secret = process.env.JWT_SECRET as string;

const authorize = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, secret);

        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

export default authorize;
