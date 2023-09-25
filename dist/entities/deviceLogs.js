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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceLogs = void 0;
const typeorm_1 = require("typeorm");
let DeviceLogs = exports.DeviceLogs = class DeviceLogs {
    updateCreatedDate() {
        this.createdDate = new Date();
    }
    updateUpdatedDate() {
        this.updatedDate = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", Number)
], DeviceLogs.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DeviceLogs.prototype, "LogNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], DeviceLogs.prototype, "LogTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], DeviceLogs.prototype, "MajorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], DeviceLogs.prototype, "MinorType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], DeviceLogs.prototype, "CardNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], DeviceLogs.prototype, "EmployeeNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date
    // and this!
    )
], DeviceLogs.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], DeviceLogs.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeviceLogs.prototype, "updateCreatedDate", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DeviceLogs.prototype, "updateUpdatedDate", null);
exports.DeviceLogs = DeviceLogs = __decorate([
    (0, typeorm_1.Entity)()
], DeviceLogs);
exports.default = DeviceLogs;
