"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
router
    .route('/')
    .get(controller_1.default.getAll)
    .post(controller_1.default.addNewDevice);
router
    .route('/:id')
    .get(controller_1.default.getOne)
    .patch(controller_1.default.update)
    .delete(controller_1.default.deleteDevice);
exports.default = router;
