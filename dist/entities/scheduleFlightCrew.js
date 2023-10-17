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
const user_1 = __importDefault(require("./user"));
const flightSchedule_1 = __importDefault(require("./flightSchedule"));
const airlineType_1 = __importDefault(require("./airlineType"));
const flight_1 = __importDefault(require("./flight"));
let scheduleFlightCrew = class scheduleFlightCrew {
    updateCreatedDate() {
        this.createdDate = new Date();
    }
    updateUpdatedDate() {
        this.updatedDate = new Date();
    }
};
__decorate([
    PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], scheduleFlightCrew.prototype, "id", void 0);
__decorate([
    ManyToOne(() => flightSchedule_1.default),
    __metadata("design:type", flightSchedule_1.default)
], scheduleFlightCrew.prototype, "scheduledFlight", void 0);
__decorate([
    ManyToOne(() => crew_1.default),
    __metadata("design:type", crew_1.default)
], scheduleFlightCrew.prototype, "crew", void 0);
__decorate([
    ManyToOne(() => flight_1.default),
    __metadata("design:type", flight_1.default)
], scheduleFlightCrew.prototype, "flight", void 0);
__decorate([
    ManyToOne(() => airlineType_1.default),
    __metadata("design:type", airlineType_1.default)
], scheduleFlightCrew.prototype, "airLine", void 0);
__decorate([
    Column({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], scheduleFlightCrew.prototype, "isLand", void 0);
__decorate([
    Column({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], scheduleFlightCrew.prototype, "deleted", void 0);
__decorate([
    ManyToOne(() => user_1.default),
    __metadata("design:type", user_1.default)
], scheduleFlightCrew.prototype, "createdBy", void 0);
__decorate([
    ManyToOne(() => user_1.default),
    __metadata("design:type", user_1.default)
], scheduleFlightCrew.prototype, "updatedBy", void 0);
__decorate([
    Column({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date
    // and this!
    )
], scheduleFlightCrew.prototype, "createdDate", void 0);
__decorate([
    Column({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], scheduleFlightCrew.prototype, "updatedDate", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], scheduleFlightCrew.prototype, "updateCreatedDate", null);
__decorate([
    BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], scheduleFlightCrew.prototype, "updateUpdatedDate", null);
scheduleFlightCrew = __decorate([
    Entity()
], scheduleFlightCrew);
exports.default = scheduleFlightCrew;
