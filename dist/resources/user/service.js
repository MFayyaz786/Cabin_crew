"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const user_1 = __importDefault(require("../../entities/user"));
const typeorm_1 = require("typeorm");
const userRepo = (0, typeorm_1.getRepository)(user_1.default);
var UserRole;
(function (UserRole) {
    UserRole["Air_Port_Manager"] = "Air_Port_Manager";
    UserRole["Air_Line_Manager"] = "Air_Line_Manager";
    UserRole["Staff"] = "Staff";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class UserService {
    static create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = userRepo.create(userData);
            yield userRepo.save(user);
            return user;
        });
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userRepo.find({ select: ["id", "firstName", "lastName", "email", "phone", "role"], relations: ['booth', "airLine"] });
            return result;
        });
    }
    static getAirLineManagers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userRepo.find({ where: { role: "Air Line Manager" },
                select: ["id", "firstName", "lastName", "email", "phone", "role"],
                relations: ['booth', 'airLine'] });
            return result;
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userRepo.findOne({ where: { id: id }, select: ["id", "firstName", "lastName", "email", "phone", "role"], relations: ['booth', 'airLine'] });
            return user;
        });
    }
    static update(id, userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userRepo.update({ id }, userData);
            console.log("result is", result);
            return result;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield userRepo.delete({ id });
            return result;
        });
    }
}
exports.default = UserService;
