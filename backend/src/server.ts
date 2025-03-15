import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import contectDB from './config/db'
import auth from './routes/auth'
import prop from './routes/prop'
import http from 'http';
import setupSocket from './sockets/sockets';

dotenv.config();

const app = express();
const server = http.createServer(app);
setupSocket(server);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is running...');
});

app.use('/api/auth', auth);
app.use('/api/prop', prop);

contectDB().then(() => {
  server.listen(process.env.PORT || 5200, () => {
    console.log(`Server running`);
  });
});
