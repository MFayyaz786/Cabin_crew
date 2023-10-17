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
const { Entity, PrimaryGeneratedColumn, Column, BaseEntity, BeforeInsert, BeforeUpdate, Unique, ManyToOne, JoinColumn, ManyToMany } = require('typeorm');
const flight_1 = __importDefault(require("./flight"));
const airlineType_1 = __importDefault(require("./airlineType"));
const user_1 = __importDefault(require("./user"));
const flightStatus_1 = __importDefault(require("./flightStatus"));
let FlightSchedule = class FlightSchedule {
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
], FlightSchedule.prototype, "id", void 0);
__decorate([
    Column({ type: Date }),
    __metadata("design:type", Date)
], FlightSchedule.prototype, "scheduleDate", void 0);
__decorate([
    Column({ type: Date }),
    __metadata("design:type", Date)
], FlightSchedule.prototype, "departureDate", void 0);
__decorate([
    Column({ type: Date }),
    __metadata("design:type", Date)
], FlightSchedule.prototype, "arrivalDate", void 0);
__decorate([
    ManyToOne(() => airlineType_1.default),
    __metadata("design:type", airlineType_1.default)
], FlightSchedule.prototype, "airLine", void 0);
__decorate([
    ManyToOne(() => flight_1.default),
    __metadata("design:type", flight_1.default)
], FlightSchedule.prototype, "flight", void 0);
__decorate([
    Column({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], FlightSchedule.prototype, "isSchedule", void 0);
__decorate([
    Column({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], FlightSchedule.prototype, "isLand", void 0);
__decorate([
    ManyToOne(() => flightStatus_1.default),
    __metadata("design:type", flightStatus_1.default)
], FlightSchedule.prototype, "flightStatus", void 0);
__decorate([
    Column({ enum: ["arrival", "departure"], default: "departure" }),
    __metadata("design:type", String)
], FlightSchedule.prototype, "scheduleType", void 0);
__decorate([
    Column({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], FlightSchedule.prototype, "deleted", void 0);
__decorate([
    ManyToOne(() => user_1.default),
    __metadata("design:type", user_1.default)
], FlightSchedule.prototype, "createdBy", void 0);
__decorate([
    ManyToOne(() => user_1.default),
    __metadata("design:type", user_1.default)
], FlightSchedule.prototype, "updatedBy", void 0);
__decorate([
    Column({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date
    // and this!
    )
], FlightSchedule.prototype, "createdDate", void 0);
__decorate([
    Column({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FlightSchedule.prototype, "updatedDate", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlightSchedule.prototype, "updateCreatedDate", null);
__decorate([
    BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FlightSchedule.prototype, "updateUpdatedDate", null);
FlightSchedule = __decorate([
    Entity()
], FlightSchedule);
exports.default = FlightSchedule;
