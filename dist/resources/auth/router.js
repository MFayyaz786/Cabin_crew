"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller_1 = __importDefault(require("./controller"));
router.get("/all", controller_1.default.getAll);
router.get("/details", controller_1.default.getOne);
router.post("/requestOtp", controller_1.default.sendOtp);
router.post("/verifyOtp", controller_1.default.verifyOtp);
router.post("/resetPassword", controller_1.default.resetPassword);
router.post("/forgotPassword", controller_1.default.forgotPassword);
router.post("/signIn", controller_1.default.login);
router.post("/refreshToken", controller_1.default.refreshToken);
router.post("/signup", controller_1.default.create);
router.route("/")
    .patch(controller_1.default.update)
    .delete(controller_1.default.deleteUser);
exports.default = router;
