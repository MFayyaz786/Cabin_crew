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
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./user"));
let Booth = class Booth {
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
], Booth.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false, unique: true }),
    __metadata("design:type", String)
], Booth.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String }),
    __metadata("design:type", String)
], Booth.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Booth.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Booth.prototype, "isAssigned", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Booth.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default),
    __metadata("design:type", user_1.default)
], Booth.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default),
    __metadata("design:type", user_1.default)
], Booth.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date
    // and this!
    )
], Booth.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Booth.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Booth.prototype, "updateCreatedDate", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Booth.prototype, "updateUpdatedDate", null);
Booth = __decorate([
    (0, typeorm_1.Entity)()
], Booth);
exports.default = Booth;
