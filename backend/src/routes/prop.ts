import express from 'express';
import asyncErrorHandler from '../utils/AsyncErrorHandler';
import { HandleAddProperty, HandleGetPropertys, HandleAddToFav, HandleGetFav, getUserProperties, GetUserUniqueProp, Info } from '../controller/propController';
import authorize from '../middlewares/authorize';

const router = express.Router();

router.post('/addProp', asyncErrorHandler(authorize), asyncErrorHandler(HandleAddProperty));
router.get('/getProp', asyncErrorHandler(HandleGetPropertys));
router.post('/FavProp', asyncErrorHandler(authorize), asyncErrorHandler(HandleAddToFav));
router.get('/GetProps', asyncErrorHandler(authorize), asyncErrorHandler(HandleGetFav));
router.get('/GetUserProps', asyncErrorHandler(authorize), asyncErrorHandler(getUserProperties));
router.post('/Uniqueprop', asyncErrorHandler(GetUserUniqueProp));
router.get('/getInfo', asyncErrorHandler(Info));

export default router