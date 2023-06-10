"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
require("./db/index");
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
//* Routers
const router_1 = __importDefault(require("./resources/user/router"));
const router_2 = __importDefault(require("./resources/auth/router"));
const router_3 = __importDefault(require("./resources/airlineType/router"));
const router_4 = __importDefault(require("./resources/booth/router"));
const router_5 = __importDefault(require("./resources/flight/router"));
const router_6 = __importDefault(require("./resources/crew/router"));
const app = (0, express_1.default)();
const corsOption = {
    origin: "*", // or specify the allowed origins
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.get("/", (req, res) => {
    res.status(200).send({ msg: "Welcome to AIR_PORT_CABIN_CREW" });
});
app.use((req, res, next) => {
    console.log(`Route called: ${req.originalUrl}`);
    next();
});
app.use(express_1.default.static("public"));
app.use(express_1.default.urlencoded({ extended: false }));
// app.ts
if (process.env.NODE_ENV === 'development') {
    app.use((0, morgan_1.default)('dev'));
}
else if (process.env.NODE_ENV === 'production') {
    app.use((0, helmet_1.default)());
}
//server.ts
if (process.env.NODE_ENV === 'production') {
    console.log = () => { };
    console.error = () => { };
    console.warn = () => { };
}
//* Routing 
app.use('/api/v1/auth', router_2.default);
app.use('/api/v1/users', router_1.default);
app.use('/api/v1/airline', router_3.default);
app.use('/api/v1/booth', router_4.default);
app.use('/api/v1/flight', router_5.default);
app.use('/api/v1/crew', router_6.default);
app.use("/", (req, res) => {
    res.status(404).send({ msg: "Route not found" });
});
const port = process.env.PORT || 6001;
// error handling middleware
app.use(errorHandler_middleware_1.default);
app.listen(port, () => {
    console.log(colors_1.default.yellow.bold(`--------------------------------------------------------`));
    console.log(colors_1.default.yellow.bold(`App is running on port : ${port}`));
    console.log(colors_1.default.yellow.bold(`Current Environment : ${process.env.NODE_ENV}`));
    console.log(colors_1.default.yellow.bold(`--------------------------------------------------------`));
});
