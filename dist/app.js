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
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
//* Routers
const router_1 = __importDefault(require("./resources/user/router"));
const router_2 = __importDefault(require("./resources/auth/router"));
const router_3 = __importDefault(require("./resources/airlineType/router"));
const router_4 = __importDefault(require("./resources/booth/router"));
const app = (0, express_1.default)();
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// app.get("/favicon.ico", (req, res) => {
//   // Send an appropriate response for the favicon.ico route
//   res.sendStatus(204); // No Content
// });
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
//* Routing 
app.use('/api/v1/auth', router_2.default);
app.use('/api/v1/users', router_1.default);
app.use('/api/v1/airline', router_3.default);
app.use('/api/v1/booth', router_4.default);
app.get("/", (req, res, next) => {
    res.status(200).send({ msg: "Welcome to AIR_PORT_CABIN_CREW" });
    next();
});
app.use("/", (req, res) => {
    res.status(404).send({ msg: "Route not found" });
});
app.use((req, res, next) => {
    console.log(`Route called: ${req.originalUrl}`);
    next();
});
//app.use(ErrorHandler)
// handling all (get,post,update,delete.....) unhandled routes
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on the server`, 404));
// });
// error handling middleware
app.use(errorHandler_middleware_1.default);
exports.default = app;
