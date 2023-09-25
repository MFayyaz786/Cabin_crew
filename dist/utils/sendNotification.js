"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodemailer = require("nodemailer");
const sendNotification = async (notification, users) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILHOST,
            port: process.env.MAILPORT,
            secure: false,
            auth: {
                user: process.env.MAIL,
                pass: process.env.MAILPASS,
            },
        });
        for (const user of users) {
            const mailOptions = {
                from: process.env.MAIL,
                to: user.email,
                subject: "Notification Alert",
                text: notification,
            };
            const result = await transporter.sendMail(mailOptions);
            console.log("Email sent:", result);
        }
        return true;
    }
    catch (error) {
        return false;
    }
};
exports.default = sendNotification;
