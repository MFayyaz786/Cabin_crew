"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
router.route("/")
    .post(controller_1.default.addNew)
    .get(controller_1.default.getAll)
    .patch(controller_1.default.updateAirLine);
router.get("/details", controller_1.default.getOne);
router.delete("/:id", controller_1.default.deleteAirLine);
exports.default = router;
