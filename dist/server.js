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
const errorHandler_middleware_1 = __importDefault(require("./middleware/errorHandler.middleware"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
//* Routers
const router_1 = __importDefault(require("./resources/user/router"));
const router_2 = __importDefault(require("./resources/auth/router"));
const router_3 = __importDefault(require("./resources/airlineType/router"));
const router_4 = __importDefault(require("./resources/booth/router"));
const router_5 = __importDefault(require("./resources/flight/router"));
const router_6 = __importDefault(require("./resources/crew/router"));
const router_7 = __importDefault(require("./resources/flightSchedule/router"));
const router_8 = __importDefault(require("./resources/device/router"));
const router_9 = __importDefault(require("./resources/flightStatus/router"));
const router_10 = __importDefault(require("./resources/scheduleFlightCrew/router"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const router_11 = __importDefault(require("./resources/dashboard/router"));
const router_12 = __importDefault(require("./resources/notification/router"));
const router_13 = __importDefault(require("./resources/deviceAPIs/router"));
const userSocketIds_1 = __importDefault(require("./utils/userSocketIds"));
require("./utils/generateRSAKeyPare");
const encryptionService_1 = __importDefault(require("./utils/encryptionService"));
const router_14 = __importDefault(require("./resources/whatsAppBot/router"));
const { decryptObject, encryptObject } = encryptionService_1.default;
const { addUser, deleteUser } = userSocketIds_1.default;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app); // Create an http server using the Express app
const io = new socket_io_1.Server(server); // Create a socket.io instance using the http server
app.set("socket", io);
const corsOption = {
    origin: "*", // or specify the allowed origins
};
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    const socketId = socket.id;
    addUser(userId, socketId);
    socket.on("disconnect", () => {
        deleteUser(socket.id);
        console.log("disconnected");
    });
});
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
//if (process.env.NODE_ENV === 'development') {
app.use((0, morgan_1.default)('dev'));
// } else if (process.env.NODE_ENV === 'production') {
//   app.use(helmet());
// }
//server.ts
if (process.env.NODE_ENV === 'production') {
    console.log = () => { };
    console.error = () => { };
    console.warn = () => { };
}
app.post("/encrypt", (0, express_async_handler_1.default)(async (req, res) => {
    res.status(200).send(encryptObject(req.body));
}));
app.post("/decrypt", (0, express_async_handler_1.default)(async (req, res) => {
    res.status(200).send(decryptObject(req?.body?.cipher));
}));
//app.use(encryptionMiddleware)
//* Routing 
app.use('/api/v1/auth', router_2.default);
app.use('/api/v1/users', router_1.default);
app.use('/api/v1/airline', router_3.default);
app.use('/api/v1/booth', router_4.default);
app.use('/api/v1/flight', router_5.default);
app.use('/api/v1/crew', router_6.default);
app.use('/api/v1/flightSchedule', router_7.default);
app.use('/api/v1/device', router_8.default);
app.use('/api/v1/status', router_9.default);
app.use('/api/v1/flightCrew', router_10.default);
app.use('/api/v1/dashboard', router_11.default);
app.use('/api/v1/notification', router_12.default);
app.use('/api/v1/logs', router_13.default);
app.use('/api/v1/whatsAppBot', router_14.default);
app.use("/", (req, res) => {
    res.status(404).send({ msg: "Route not found" });
});
const port = process.env.PORT || 6001;
// Error handling middleware
// app.use(
//   (err: any, req: Request, res: Response, next: NextFunction) => errorHandler(err, req, res, next)
// );
// error handling middleware
app.use(errorHandler_middleware_1.default);
server.listen(port, () => {
    console.log(colors_1.default.yellow.bold(`--------------------------------------------------------`));
    console.log(colors_1.default.yellow.bold(`App is running on port : ${port}`));
    console.log(colors_1.default.yellow.bold(`Current Environment : ${process.env.NODE_ENV}`));
    console.log(colors_1.default.yellow.bold(`--------------------------------------------------------`));
});
//"start": "npm run build && pm2 start ./dist/server.js --name cabin_crew",
//hello
