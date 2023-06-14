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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
var UserRole;
(function (UserRole) {
    UserRole["Air_Port_Manager"] = "Air_Port_Manager";
    UserRole["Air_Line_Manager"] = "Air_Line_Manager";
    UserRole["Staff"] = "Staff";
})(UserRole || (exports.UserRole = UserRole = {}));
const booth_1 = __importDefault(require("./booth"));
const airlineType_1 = __importDefault(require("./airlineType"));
let User = User_1 = class User {
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
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => booth_1.default, { nullable: true, }),
    __metadata("design:type", booth_1.default)
], User.prototype, "booth", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => airlineType_1.default, { nullable: true }),
    __metadata("design:type", airlineType_1.default)
], User.prototype, "airLine", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false, enum: UserRole }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false, unique: true }),
    (0, class_validator_1.IsEmail)({}, { message: "Please enter a valid email" }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {
        message: 'Password must contain at least one letter, one number, and be at least 8 characters long.',
    }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMobilePhone)("en-US", {}, { message: "Please enter a valid phone number" }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Number, nullable: true, default: null }),
    __metadata("design:type", Number)
], User.prototype, "otp", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: Date, default: null, nullable: true }),
    __metadata("design:type", Date)
], User.prototype, "otpExpire", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: String, nullable: true, default: null }),
    __metadata("design:type", String)
], User.prototype, "token", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1),
    __metadata("design:type", User)
], User.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1),
    __metadata("design:type", User)
], User.prototype, "updatedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date
    // and this!
    )
], User.prototype, "createdDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], User.prototype, "updatedDate", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "updateCreatedDate", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "updateUpdatedDate", null);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)(),
    (0, typeorm_1.Unique)(['email', 'phone'])
], User);
exports.default = User;
