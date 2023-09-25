"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
console.log('process.env.SMSUserName :>> ', process.env.SMSUserName);
console.log('process.env.SMSPassword :>> ', process.env.SMSPassword);
console.log('process.env.SMSURL :>> ', process.env.SMSURL);
const smsServices = {
    sendSMS: async (Message, PhoneNumber) => {
        const Request = {
            UserName: process.env.SMSUserName,
            Password: process.env.SMSPassword,
            Message,
            PhoneNumber,
            RequestedDateTime: new Date().toLocaleString(),
        };
        console.log(Request);
        const res = await axios_1.default.post(process.env.SMSURL || '', Request);
        return res;
    },
};
exports.default = smsServices;
