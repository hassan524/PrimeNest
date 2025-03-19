"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AsyncErrorHandler_1 = __importDefault(require("../utils/AsyncErrorHandler"));
const propController_1 = require("../controller/propController");
const authorize_1 = __importDefault(require("../middlewares/authorize"));
const router = express_1.default.Router();
router.post('/addProp', (0, AsyncErrorHandler_1.default)(authorize_1.default), (0, AsyncErrorHandler_1.default)(propController_1.HandleAddProperty));
router.get('/getProp', (0, AsyncErrorHandler_1.default)(propController_1.HandleGetPropertys));
router.post('/FavProp', (0, AsyncErrorHandler_1.default)(authorize_1.default), (0, AsyncErrorHandler_1.default)(propController_1.HandleAddToFav));
router.get('/GetProps', (0, AsyncErrorHandler_1.default)(authorize_1.default), (0, AsyncErrorHandler_1.default)(propController_1.HandleGetFav));
router.get('/GetUserProps', (0, AsyncErrorHandler_1.default)(authorize_1.default), (0, AsyncErrorHandler_1.default)(propController_1.getUserProperties));
router.post('/Uniqueprop', (0, AsyncErrorHandler_1.default)(propController_1.GetUserUniqueProp));
router.get('/getInfo', (0, AsyncErrorHandler_1.default)(propController_1.Info));
exports.default = router;
