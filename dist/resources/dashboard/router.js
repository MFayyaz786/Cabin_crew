"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = __importDefault(require("./controller"));
router.get("/states", controller_1.default.getStates);
router.get("/staff/states", controller_1.default.getStaffStates);
router.get("/airLine/states/:id", controller_1.default.getAirLineStates);
exports.default = router;
