"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
};
exports.default = OTP;
