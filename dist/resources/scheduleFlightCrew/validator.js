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
    crews: Joi.array().min(1).required(),
    scheduledFlight: Joi.string().required(),
    flight: Joi.string().required(),
    airLine: Joi.string().required(),
    createdBy: Joi.string().required()
});
const addNewCrew = Joi.object({
    crew: Joi.string().required(),
    scheduledFlight: Joi.string().required(),
    flight: Joi.string().required(),
    airLine: Joi.string().required(),
    updatedBy: Joi.string().required()
});
const updateFlight = Joi.object({
    flightNo: Joi.string().optional(),
    destination: Joi.string().optional(),
    origin: Joi.string().optional(),
    status: Joi.string().valid('in_process', 'not_initiated', 'closed').optional(),
    airLine: Joi.string().optional(),
    updatedBy: Joi.string().optional()
});
const updateFlightStatus = Joi.object({
    //flightNo:Joi.string().required(),
    flightStatus: Joi.string().required(),
});
exports.default = { addNew, updateFlight, updateFlightStatus, addNewCrew };
