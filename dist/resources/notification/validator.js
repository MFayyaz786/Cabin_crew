"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const addNew = joi_1.default.object({
    notification: joi_1.default.string().required(),
    intensity: joi_1.default.string().required().valid("low", "medium", "high"),
    deliverTo: joi_1.default.array().required().items(joi_1.default.string().valid("Air Port Manager"), joi_1.default.string().valid("Air Line Manager"), joi_1.default.string().valid("Staff")).min(1),
    createdBy: joi_1.default.string().required()
});
const update = joi_1.default.object({
    notification: joi_1.default.string().optional(),
    intensity: joi_1.default.string().optional().valid("low", "medium", "high"),
    deliverTo: joi_1.default.array().optional().items(joi_1.default.string().valid("Air Port Manager"), joi_1.default.string().valid("Air Line Manager"), joi_1.default.string().valid("Staff")),
    status: joi_1.default.string().optional().valid("pending", "resolved", "reviewed"),
    updatedBy: joi_1.default.string().required()
});
exports.default = { addNew, update };
