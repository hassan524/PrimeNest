import express from 'express';
import asyncErrorHandler from '../../utils/AsyncErrorHandler';
import { HandleAddProperty, HandleGetPropertys, HandleAddToFav, HandleGetFav } from '../controller/propController';
import authorize from '../middlewares/authorize';

const router = express.Router();

router.post('/addProp', asyncErrorHandler(authorize), asyncErrorHandler(HandleAddProperty));
router.get('/getProp', asyncErrorHandler(HandleGetPropertys));
router.post('/FavProp', asyncErrorHandler(authorize), asyncErrorHandler(HandleAddToFav));
router.get('/GetProp', asyncErrorHandler(authorize), asyncErrorHandler(HandleGetFav));

export default router