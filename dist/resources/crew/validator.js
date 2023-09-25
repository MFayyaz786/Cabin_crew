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
const addNew = Joi.object({
    employId: Joi.number().integer().required(),
    airLine: Joi.string().required(),
    name: Joi.string().required(),
    gender: Joi.string().valid('male', 'female'),
    destination: Joi.string().optional(),
    uniqueId: Joi.string().optional(),
    designation: Joi.string().valid('captain', 'airhostess').required(),
    image: Joi.string().required(),
    phone: Joi.string()
        .pattern(/^\+[1-9]\d{1,14}$/)
        .required()
        .messages({
        "string.pattern.base": "please enter contact with following formate +923xxxxxxxxx",
    }),
    cardNo: Joi.number().integer().required(),
    createdBy: Joi.string().required()
});
const pushCrewDetails = Joi.object({
    crewId: Joi.string().required(),
    cardNo: Joi.number().integer().required(),
    employeeId: Joi.number().integer().required(),
    name: Joi.string().required(),
    image: Joi.string().required(),
});
const updateCrew = Joi.object({
    name: Joi.string().optional(),
    gender: Joi.string().valid('male', 'female').optional(),
    destination: Joi.string().optional(),
    designation: Joi.string().valid('captain', 'airhostess').optional(),
    phone: Joi.string()
        .pattern(/^\+[1-9]\d{1,14}$/)
        .messages({
        "string.pattern.base": "please enter contact with following formate +923xxxxxxxxx",
    }).optional(),
    image: Joi.string().optional(),
    updatedBy: Joi.string().required()
});
const registerThumb = Joi.object({
    // employId:Joi.number().required(),
    cardNo: Joi.number().required(),
});
const verifyThumb = Joi.object({
    thumbImpression: Joi.string().required(),
});
exports.default = { addNew, updateCrew, registerThumb, verifyThumb, pushCrewDetails };
