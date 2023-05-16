"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const colors_1 = __importDefault(require("colors"));
require("./db/index");
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    console.error(err.stack);
    process.exit(1);
});
const port = process.env.PORT || 6001;
const server = app_1.default.listen(port, () => {
    console.log(colors_1.default.yellow.bold(`--------------------------------------------------------`));
    console.log(colors_1.default.yellow.bold(`App is running on port ${port}`));
    console.log(colors_1.default.yellow.bold(`Current Environment: ${process.env.NODE_ENV}`));
    console.log(colors_1.default.yellow.bold(`--------------------------------------------------------`));
});
process.on('unhandledRejection', (error) => {
    console.log('Unhandled Rejection => shutting down..... ');
    console.log(error.name, error.message);
    server.close(() => {
        process.exit(1);
    });
});
if (process.env.NODE_ENV === 'production') {
    console.log = () => { };
    console.error = () => { };
    console.warn = () => { };
}
