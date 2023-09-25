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
const class_validator_1 = require("class-validator");
const airlineType_1 = __importDefault(require("./airlineType"));
const user_1 = __importDefault(require("./user"));
let Crew = class Crew {
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
], Crew.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', unique: true, nullable: false }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.Length)(1, 32),
    __metadata("design:type", Number)
], Crew.prototype, "employId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => airlineType_1.default, { nullable: true }),
    __metadata("design:type", airlineType_1.default)
], Crew.prototype, "airLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Crew.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    __metadata("design:type", String)
], Crew.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: false, unique: true }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.Length)(1, 32),
    __metadata("design:type", Number)
], Crew.prototype, "uniqueId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMobilePhone)("en-US", {}, { message: "Please enter a valid phone number" }),
    __metadata("design:type", String)
], Crew.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "deviceIp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "thumbImpression", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true }),
    __metadata("design:type", String)
], Crew.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', nullable: true }),
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.Length)(1, 32),
    __metadata("design:type", Number)
], Crew.prototype, "cardNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true, default: 'comments' }),
    __metadata("design:type", String)
], Crew.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, nullable: true, default: false }),
    __metadata("design:type", Boolean)
], Crew.prototype, "isVerified", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Crew.prototype, "onDuty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Crew.prototype, "isDeliveredToDevice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Boolean, default: false }),
    __metadata("design:type", Boolean)
], Crew.prototype, "deleted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default),
    __metadata("design:type", user_1.default)
], Crew.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default),
    __metadata("design:type", user_1.default)
], Crew.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date
    // and this!
    )
], Crew.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Crew.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Crew.prototype, "updateCreatedDate", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Crew.prototype, "updateUpdatedDate", null);
Crew = __decorate([
    (0, typeorm_1.Entity)()
], Crew);
exports.default = Crew;
