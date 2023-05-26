"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const authentication_middleware_1 = __importDefault(require("../../middleware/authentication.middleware"));
const router = express_1.default.Router();
router
    .route('/')
    .get(controller_1.default.getAll)
    .post(authentication_middleware_1.default, controller_1.default.create);
router
    .route('/:id')
    .get(controller_1.default.getOne)
    .patch(authentication_middleware_1.default, controller_1.default.update)
    .delete(authentication_middleware_1.default, controller_1.default.deleteUser);
exports.default = router;
