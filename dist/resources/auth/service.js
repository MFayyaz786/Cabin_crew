"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.service = void 0;
const user_1 = __importDefault(require("../../entities/user"));
const auth_1 = __importDefault(require("../../entities/auth"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_1 = require("typeorm");
const authRepo = (0, typeorm_1.getRepository)(auth_1.default);
const jwtServices_1 = __importDefault(require("../../utils/jwtServices"));
const uuid_1 = require("uuid");
const smsService_1 = __importDefault(require("../../utils/smsService"));
const userRepo = (0, typeorm_1.getRepository)(user_1.default);
exports.service = {
    create: async (userData) => {
        const salt = await bcrypt_1.default.genSalt(10);
        userData.password = await bcrypt_1.default.hash(userData.password, salt);
        console.log("userdata", userData);
        const users = userRepo.create(userData);
        await userRepo.save(users);
        return users;
    },
    login: async (email) => {
        let user = await userRepo.findOne({ where: { email }, select: ["phone", "id", "role", "firstName", "lastName", "password"], relations: ['airLine'] });
        if (user) {
            const uuid = (0, uuid_1.v4)();
            console.log("uuid", uuid);
            const refreshToken = await jwtServices_1.default.create({ uuid, type: user.role });
            const accessToken = await jwtServices_1.default.create({ userId: user.id, type: user.role }, "5m");
            await exports.service.add(user.id, String(uuid));
            await userRepo.update({ id: user.id }, { token: String(accessToken) });
            user = Object.assign({}, user, { accessToken, refreshToken });
        }
        return user;
    },
    validatePassword: async (password, realPassword) => {
        console.log(password, realPassword);
        const valid = await bcrypt_1.default.compare(password, realPassword);
        return valid;
    },
    getAll: async () => {
        const result = await userRepo.find({ select: ["firstName", "lastName", "email", "phone", "id",] });
        //,relations:["role"]});
        return result;
    },
    getOne: async (id) => {
        const user = await userRepo.findOne({ where: { id: id }, select: ["id", "firstName", "lastName", "email", "phone"] });
        return user;
    },
    update: async (id, userData) => {
        const result = await userRepo.
            // .createQueryBuilder()
            //   .update(User)
            //   .set(userData)
            //   .where( { id: id })
            //   .returning("*") // Specify the columns you want to retrieve
            //   .execute();
            update({ id }, userData);
        return result;
    },
    requestOtp: async (otp, email) => {
        const otpExpire = new Date(new Date().getTime() + 5 * 60000);
        const result = await userRepo
            .createQueryBuilder()
            .update(user_1.default)
            .set({ otp, otpExpire })
            .where({ email }).returning("*")
            .execute();
        //.update({email},{otp,otpExpire})
        if (result.affected) {
            await smsService_1.default.sendSMS(String(`Your otp is ${otp}`), String(result.raw[0].phone));
        }
        return result.raw[0];
    },
    otpExpiryValidation: async (email) => {
        const result = await userRepo.findOne({ where: { email, otpExpire: (0, typeorm_1.MoreThanOrEqual)(new Date()) } });
        return result;
    },
    isValidOtp: async (otp, email) => {
        const result = await userRepo.update({ email: email, otp: otp }, { otp: null });
        return result;
    },
    resetPassword: async (id, password) => {
        const salt = await bcrypt_1.default.genSalt(10);
        password = await bcrypt_1.default.hash(password, salt);
        const result = await userRepo.update({ id }, { password });
        return result;
    },
    forgotPassword: async (email, password) => {
        console.log(email, password);
        const salt = await bcrypt_1.default.genSalt(10);
        password = await bcrypt_1.default.hash(password, salt);
        const result = await userRepo.update({ email }, { password });
        return result;
    },
    delete: async (id) => {
        const result = await userRepo.delete({ id });
        console.log("result is", result);
        return result;
    },
    add: async (userId, uuid) => {
        const result = await authRepo.update({ userId }, { uuid });
        if (result.affected) {
            return result;
        }
        const newAuthId = await authRepo.create({ userId, uuid });
        await authRepo.save(newAuthId);
        console.log(newAuthId);
        return newAuthId;
    },
    findByUUID: async (uuid) => {
        const result = await authRepo.findOne({ where: { uuid } });
        return result;
    },
};
exports.default = exports.service;
