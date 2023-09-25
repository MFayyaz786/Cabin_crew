"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const appError_1 = __importDefault(require("../utils/appError"));
const encryptionService_1 = __importDefault(require("../../src/utils/encryptionService"));
const { decryptObject, encryptObject } = encryptionService_1.default;
const encryptionMiddleware = (0, express_async_handler_1.default)((req, res, next) => {
    // Decrypt request body if it exists
    if (req.body && req.body.cipher) {
        try {
            const decrypted = decryptObject(req.body.cipher);
            req.body = decrypted;
            console.log("req.body: ", req.body);
        }
        catch (err) {
            console.log(err);
            return next(new appError_1.default("invalid request body", 400));
            //res.status(400).json({ error: "Invalid request body" });
        }
    }
    // Encrypt response data
    if (res.json) {
        const originalJson = res.json;
        res.json = function (data) {
            const encrypted = encryptObject(data);
            return originalJson.call(this, encrypted);
        };
    }
    next();
});
exports.default = encryptionMiddleware;
