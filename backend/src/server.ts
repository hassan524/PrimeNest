import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';
import auth from './routes/auth';
import prop from './routes/prop';
import http from 'http';
import setupSocket from './sockets/sockets';

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: "https://prime-nest-a9x1.vercel.app", 
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://prime-nest-a9x1.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://prime-nest-a9x1.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running...');
});

setupSocket(server);
app.use('/api/auth', auth);
app.use('/api/prop', prop);

connectDB().then(() => {
  server.listen(process.env.PORT || 5200, () => {
    console.log(`Server running on port ${process.env.PORT || 5200}`);
  });
});
