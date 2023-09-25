"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate, Unique, ManyToOne, ManyToMany } = require('typeorm');
const crew_1 = __importDefault(require("./crew"));
const flightSchedule_1 = __importDefault(require("./flightSchedule"));
const flight_1 = __importDefault(require("./flight"));
let scheduleCrews = class scheduleCrews {
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], scheduleCrews.prototype, "id", void 0);
__decorate([
    ManyToOne(() => crew_1.default),
    __metadata("design:type", crew_1.default)
], scheduleCrews.prototype, "crew", void 0);
__decorate([
    ManyToOne(() => flightSchedule_1.default),
    __metadata("design:type", flightSchedule_1.default)
], scheduleCrews.prototype, "scheduledFlight", void 0);
__decorate([
    ManyToOne(() => flight_1.default),
    __metadata("design:type", flight_1.default)
], scheduleCrews.prototype, "flight", void 0);
scheduleCrews = __decorate([
    Entity()
], scheduleCrews);
exports.default = scheduleCrews;
