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
setupSocket(server);

const corsOptions = {
  origin: 'https://prime-nest-a9x1.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running...');
});

app.use('/api/auth', auth);
app.use('/api/prop', prop);

connectDB().then(() => {
  server.listen(process.env.PORT || 5200, () => {
    console.log(`Server running on port ${process.env.PORT || 5200}`);
  });
});
