import express from 'express';
import { UserLogin, UserSignUp, AuthCheck, } from '../controller/authController';
import asyncErrorHandler from '../utils/AsyncErrorHandler';

const router = express.Router();

router.post('/login', asyncErrorHandler(UserLogin));
router.post('/signup', asyncErrorHandler(UserSignUp));
router.get('/authcheck', asyncErrorHandler(AuthCheck));

export default router