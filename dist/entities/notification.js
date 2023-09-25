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
const user_1 = __importDefault(require("./user"));
let Notification = class Notification {
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
], Notification.prototype, "id", void 0);
__decorate([
    Column({ type: String }),
    __metadata("design:type", String)
], Notification.prototype, "notification", void 0);
__decorate([
    Column({ type: String, default: "low" }),
    __metadata("design:type", String)
], Notification.prototype, "intensity", void 0);
__decorate([
    Column({ type: String, default: "pending" }),
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
__decorate([
    Column({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "deleted", void 0);
__decorate([
    Column({ type: String }),
    __metadata("design:type", Array)
], Notification.prototype, "deliverTo", void 0);
__decorate([
    Column({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Notification.prototype, "isSent", void 0);
__decorate([
    ManyToOne(() => user_1.default),
    __metadata("design:type", user_1.default)
], Notification.prototype, "createdBy", void 0);
__decorate([
    ManyToOne(() => user_1.default),
    __metadata("design:type", user_1.default)
], Notification.prototype, "updatedBy", void 0);
__decorate([
    Column({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date
    // and this!
    )
], Notification.prototype, "createdDate", void 0);
__decorate([
    Column({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Notification.prototype, "updatedDate", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Notification.prototype, "updateCreatedDate", null);
__decorate([
    BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Notification.prototype, "updateUpdatedDate", null);
Notification = __decorate([
    Entity()
], Notification);
;
exports.default = Notification;
