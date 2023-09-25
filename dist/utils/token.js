"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
console.log('process.env.JWT_SECRET', process.env.JWT_SECRET);
console.log('process.env.JWT_REFRESH_SECRET', process.env.JWT_REFRESH_SECRET);
const createAccessToken = (user) => {
    const payload = {
        id: user.id,
        token: user.token
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN, // access token valid for 15 minutes
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (user) => {
    const payload = {
        id: user.id,
        token: user.token
    };
    return jsonwebtoken_1.default.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN, // refresh token valid for 1 days
    });
};
exports.createRefreshToken = createRefreshToken;
const verifyToken = async (token, isRefreshToken = false) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, isRefreshToken ? process.env.JWT_REFRESH_SECRET : process.env.JWT_SECRET, (err, payload) => {
            if (err)
                return reject(err);
            resolve(payload);
        });
    });
};
exports.verifyToken = verifyToken;
