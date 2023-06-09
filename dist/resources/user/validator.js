"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Joi = __importStar(require("joi"));
const registered = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().required().valid("Air Port Manager", "Air Line Manager", "Staff"),
    email: Joi.string()
        .email()
        .required()
        .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
    phone: Joi.string()
        .pattern(/^\+[1-9]\d{1,14}$/)
        .required()
        .messages({
        "string.pattern.base": "please enter contact with following formate +923xxxxxxxxx",
    }),
    password: Joi.string()
        .required()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .messages({
        "string.pattern.base": "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long",
    }),
    booth: Joi.when("role", {
        is: "Staff",
        then: Joi.string().required(),
        otherwise: Joi.string().allow("").optional(),
    }),
});
const updateProfile = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    role: Joi.string().valid("Air Port Manager", "Air Line Manager", "Staff Manager").optional(),
    phone: Joi.string().when("name", {
        is: Joi.exist(),
        then: Joi.string()
            .pattern(/^\+[1-9]\d{1,14}$/)
            .required(),
        otherwise: Joi.string().allow("").optional(),
    }),
});
exports.default = { registered, updateProfile };
