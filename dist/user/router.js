"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = __importDefault(require("./controller"));
router.post("/", controller_1.default.create);
router.get("/all", controller_1.default.getAll);
router.get("/details", controller_1.default.getOne);
router.patch("/", controller_1.default.update);
router.delete("/", controller_1.default.deleteUser);
exports.default = router;
