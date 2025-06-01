import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.model';


dotenv.config();
const saltRounds = 10;
const secret = process.env.JWT_SECRET as string;

export const UserSignUp = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
        username,
        email,
        password: hash,
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json({ message: "Account Created Successfully", user: savedUser });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

export const UserLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        console.log('here email bud', email, password)
    
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });
        console.log('find user', user)
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
    
        const token = jwt.sign({ id: user._id, name: user.username, email: user.email }, secret, { expiresIn: "7d" });
    
        res.json({ id: user._id, name: user.username, email: user.email, token });
      } catch (err: any) {
        console.error("Login server error:", err); // Log the full error to your terminal
        res.status(500).json({ error: err.message });
      }
};

export const AuthCheck = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.HToken;

        if (!token) {
            return res.status(401).json({ isAuthenticated: false, message: "No token provided" });
        }

        if (!process.env.JWT_SECRET_KEY) {
            console.error("Error: JWT_SECRET_KEY is missing in .env file!");
            return res.status(500).json({ message: "Server Error: Missing JWT Secret Key" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);

        return res.status(200).json({
            isAuthenticated: true,
            user: decoded
        });

    } catch (error) {
        console.error("Error in AuthCheck:", error);
        return res.status(401).json({ isAuthenticated: false, message: "Invalid or expired token" });
    }
};