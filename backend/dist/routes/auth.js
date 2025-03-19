"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controller/authController");
const AsyncErrorHandler_1 = __importDefault(require("../utils/AsyncErrorHandler"));
const router = express_1.default.Router();
router.post('/login', (0, AsyncErrorHandler_1.default)(authController_1.UserLogin));
router.post('/signup', (0, AsyncErrorHandler_1.default)(authController_1.UserSignUp));
router.get('/authcheck', (0, AsyncErrorHandler_1.default)(authController_1.AuthCheck));
exports.default = router;
