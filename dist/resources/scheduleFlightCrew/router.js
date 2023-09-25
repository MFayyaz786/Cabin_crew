"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
router.get("/getByScheduleId/:id", controller_1.default.getBySchedule);
router.delete("/remove/:id", controller_1.default.removeCrew);
router.post("/pushToDevice/:id", controller_1.default.pushDateToDevice);
router.post("/logs", controller_1.default.getDeviceLogs);
router
    .route('/')
    .get(controller_1.default.getAll)
    .post(controller_1.default.create);
router
    .route('/:id')
    .get(controller_1.default.getOne)
    .patch(controller_1.default.addCrew);
exports.default = router;
