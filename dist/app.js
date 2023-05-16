"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./resources/user/router"));
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorHandler_middleware_2 = __importDefault(require("./middleware/errorHandler.middleware"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use((0, cors_1.default)());
// app.ts
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else if (process.env.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)());
}
// server.ts
if (process.env.NODE_ENV === 'production') {
    console.log = () => { };
    console.error = () => { };
    console.warn = () => { };
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Add your controllers here
app.get("/", (req, res) => {
    res.status(200).send({ msg: "Welcome To   " });
});
// app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', router_1.default);
app.use(errorHandler_middleware_2.default);
// handling all (get,post,update,delete.....) unhandled routes
app.all('*', (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on the server`, 404));
});
// error handling middleware
app.use(errorHandler_middleware_1.default);
exports.default = app;
