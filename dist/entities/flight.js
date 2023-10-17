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
exports.FlightStatus = void 0;
const typeorm_1 = require("typeorm");
const airlineType_1 = __importDefault(require("./airlineType"));
var FlightStatus;
(function (FlightStatus) {
    FlightStatus["in_process"] = "in_process";
    FlightStatus["not_initiated"] = "not_initiated";
    FlightStatus["closed"] = "closed";
})(FlightStatus || (exports.FlightStatus = FlightStatus = {}));
const user_1 = __importDefault(require("./user"));
let Flight = class Flight {
    updateCreatedDate() {
        this.createdDate = new Date();
    }
    updateUpdatedDate() {
        this.updatedDate = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Flight.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, unique: true }),
    __metadata("design:type", String)
], Flight.prototype, "flightNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, }),
    __metadata("design:type", String)
], Flight.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, }),
    __metadata("design:type", String)
], Flight.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Flight.prototype, "boardingTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false, enum: FlightStatus, default: 'in_process' }),
    __metadata("design:type", String)
], Flight.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => airlineType_1.default),
    __metadata("design:type", airlineType_1.default)
], Flight.prototype, "airLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Flight.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Flight.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default),
    __metadata("design:type", user_1.default)
], Flight.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default),
    __metadata("design:type", user_1.default)
], Flight.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date
    // and this!
    )
], Flight.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Flight.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Flight.prototype, "updateCreatedDate", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Flight.prototype, "updateUpdatedDate", null);
Flight = __decorate([
    (0, typeorm_1.Entity)()
], Flight);
exports.default = Flight;
