"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./controller"));
const router = express_1.default.Router();
router.get("/verified/:airLine", controller_1.default.getAllVerified);
router
    .route('/')
    .get(controller_1.default.getAll)
    .post(controller_1.default.create);
router.post("/registerThumb", controller_1.default.registerCrewThumb);
router.post("/verifyThumb", controller_1.default.verifyThumbImpression);
router.post("/pushCrewDetails", controller_1.default.pushCrewData);
router
    .route('/:id')
    .get(controller_1.default.getOne)
    .patch(controller_1.default.update)
    .delete(controller_1.default.deleteCrew);
router.get("/airLine/:airLine", controller_1.default.getCrewsByAirLine);
exports.default = router;
