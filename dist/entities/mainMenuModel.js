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
const typeorm_1 = require("typeorm");
let MainMenuEntity = class MainMenuEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], MainMenuEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainMenuEntity.prototype, "mainMenuId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MainMenuEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], MainMenuEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], MainMenuEntity.prototype, "updatedAt", void 0);
MainMenuEntity = __decorate([
    (0, typeorm_1.Entity)('MainMenu')
], MainMenuEntity);
exports.default = MainMenuEntity;
