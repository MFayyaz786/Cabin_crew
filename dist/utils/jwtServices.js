"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtServices = {
    create: async (data, expiresIn) => {
        const jwtKey = process.env.JWT_SECRET;
        if (!jwtKey) {
            throw new Error("JWT secret key not found in environment variables");
        }
        if (process.env.NODE_ENV === 'development') {
            expiresIn = '5 min';
        }
        const expiredIn = expiresIn || '365d';
        console.log(data);
        const token = jsonwebtoken_1.default.sign(data, jwtKey, { expiresIn: expiredIn });
        return token;
    },
    authenticate: async (token) => {
        const jwtKey = process.env.JWT_SECRET;
        if (!jwtKey) {
            throw new Error("JWT secret key not found in environment variables");
        }
        const verifyToken = jsonwebtoken_1.default.verify(token, jwtKey);
        return verifyToken;
    }
};
exports.default = jwtServices;
