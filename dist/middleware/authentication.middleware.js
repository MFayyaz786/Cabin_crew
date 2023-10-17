"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const user_1 = __importDefault(require("../entities/user"));
const token_1 = require("../utils/token");
const typeorm_1 = require("typeorm");
const userRepo = (0, typeorm_1.getRepository)(user_1.default);
exports.default = (0, catchAsync_1.default)(async (req, res, next) => {
    // Get the token if it exists
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new appError_1.default('you are not login ', 401));
    }
    // Validate the token
    let payload = null;
    try {
        payload = await (0, token_1.verifyToken)(token);
    }
    catch (err) {
        return next(new appError_1.default('Invalid token!', 401));
    }
    // Check if user exists
    const currentUser = await userRepo.findOne(payload.id);
    if (!currentUser) {
        return next(new appError_1.default('User belong to this token does not exists ', 401));
    }
    req.user = currentUser;
    next();
});
