"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
require("./db/index");
dotenv_1.default.config();
const router_1 = __importDefault(require("./resources/user/router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4500;
app.use(express_1.default.json());
app.use("/api/user", router_1.default);
app.get("/", (req, res) => {
    res.status(200).send({ msg: "welcome to Air port facilitate system" });
});
app.use(errorHandler_1.default);
app.listen(port, () => {
    console.log(`server is running... ${port}`);
});
