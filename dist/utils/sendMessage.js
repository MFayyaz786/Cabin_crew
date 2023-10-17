"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sendMessage = async (to, body) => {
    try {
        const data = JSON.stringify({
            messaging_product: 'whatsapp',
            recipient_type: 'individual',
            to,
            type: 'text',
            text: {
                body,
            },
        });
        const config = {
            method: 'post',
            url: `https://graph.facebook.com/v15.0/${process.env.NUMBER_ID}/messages`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.BOT_TOKEN}`,
            },
            data: data,
        };
        return await (0, axios_1.default)(config);
    }
    catch (error) {
        console.log({ msg: error.message });
        return null;
    }
};
exports.default = sendMessage;
