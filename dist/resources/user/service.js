"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../../entities/user"));
const booth_1 = __importDefault(require("../../entities/booth"));
const typeorm_1 = require("typeorm");
const userRepo = (0, typeorm_1.getRepository)(user_1.default);
const boothRepo = (0, typeorm_1.getRepository)(booth_1.default);
var UserRole;
(function (UserRole) {
    UserRole["Air_Port_Manager"] = "Air_Port_Manager";
    UserRole["Air_Line_Manager"] = "Air_Line_Manager";
    UserRole["Staff"] = "Staff";
})(UserRole || (exports.UserRole = UserRole = {}));
class UserService {
    static async create(userData) {
        const salt = await bcrypt_1.default.genSalt(10);
        userData.password = await bcrypt_1.default.hash(userData.password, salt);
        const user = userRepo.create(userData);
        await userRepo.save(user);
        if (user && user.booth !== null) {
            const boothId = String(user.booth);
            await boothRepo.update({ id: boothId }, { isAssigned: true });
        }
        return user;
    }
    static async getAll() {
        const result = await userRepo.find({ where: { deleted: false }, select: ["id", "firstName", "lastName", "email", "phone", "role"], relations: ['booth', "airLine"] });
        return result;
    }
    static async sendToList(deliverTo) {
        const jsonString = deliverTo.replace(/[{}"]/g, ''); // Remove curly braces and double quotes
        const rolesArray = jsonString.split(',').map((role) => role.trim());
        const formattedRoles = rolesArray.map((role) => {
            // Replace underscores with spaces and capitalize the first letter of each word
            const formattedRole = role.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
            return `'${formattedRole}'`;
        });
        const rolesList = `(${formattedRoles.join(',')})`;
        console.log(rolesList);
        const users = await userRepo.query(`SELECT id, "firstName", "lastName", email, phone FROM "user" WHERE "role" in ${rolesList} AND "deleted" = false`);
        return users;
    }
    static async getAirLineManagers() {
        const result = await userRepo.find({ where: { role: "Air Line Manager", deleted: false },
            select: ["id", "firstName", "lastName", "email", "phone", "role"],
            relations: ['booth', 'airLine'] });
        return result;
    }
    static async getOne(id) {
        const user = await userRepo.findOne({ where: { id: id }, select: ["id", "firstName", "lastName", "email", "phone", "role"], relations: ['booth', 'airLine'] });
        return user;
    }
    static async update(id, userData) {
        const result = await userRepo.update({ id }, userData);
        console.log("result is", result);
        return result;
    }
    static async delete(id) {
        const result = await userRepo.update({ id }, { deleted: true });
        return result;
    }
    static async isAssignedAirLine(airLine) {
        const result = await userRepo.findOne({ where: { airLine: airLine } });
        console.log(result);
        return result;
    }
}
exports.default = UserService;
