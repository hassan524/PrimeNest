import express from 'express';
import asyncErrorHandler from '../../utils/AsyncErrorHandler';
import { HandleAddProperty } from '../controller/propController';
import authorize from '../middlewares/authorize';

const router = express.Router();

router.post('/addProp', asyncErrorHandler(authorize), asyncErrorHandler(HandleAddProperty));

export default router