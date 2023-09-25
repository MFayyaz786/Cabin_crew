"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const publicKeyPath = "./publicKey.pem";
const privateKeyPath = "./privateKey.pem";
let publicKey;
let privateKey;
if (fs_1.default.existsSync(publicKeyPath) && fs_1.default.existsSync(privateKeyPath)) {
    console.log('if case');
    publicKey = fs_1.default.readFileSync(publicKeyPath);
    privateKey = fs_1.default.readFileSync(privateKeyPath);
}
else {
    console.log('else case');
    const { publicKey: pub, privateKey: priv } = crypto_1.default.generateKeyPairSync("rsa", {
        modulusLength: 512,
        publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
        privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
        },
    });
    publicKey = pub;
    privateKey = priv;
    try {
        fs_1.default.writeFileSync(publicKeyPath, publicKey);
        fs_1.default.writeFileSync(privateKeyPath, privateKey);
        console.log("File successfully written!");
    }
    catch (error) {
        console.error("Error occurred:", error);
    }
}
