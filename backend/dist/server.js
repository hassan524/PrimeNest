"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
const auth_1 = __importDefault(require("./routes/auth"));
const prop_1 = __importDefault(require("./routes/prop"));
const http_1 = __importDefault(require("http"));
const sockets_1 = __importDefault(require("./sockets/sockets"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
app.use((0, cors_1.default)({
    origin: "https://prime-nest-a9x1.vercel.app",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, sockets_1.default)(server);
app.get('/', (req, res) => {
    res.send('Server is running...');
});
app.use('/api/auth', auth_1.default);
app.use('/api/prop', prop_1.default);
(0, db_1.default)().then(() => {
    server.listen(process.env.PORT || 5200, () => {
        console.log(`Server running on port ${process.env.PORT || 5200}`);
    });
});
