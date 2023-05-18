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
const User_1 = __importDefault(require("../../entities/User"));
const typeorm_1 = require("typeorm");
const userRepo = (0, typeorm_1.getRepository)(User_1.default);
const appError_1 = __importDefault(require("../../utils/appError"));
// export  const service=  {
//   create:async(userData: User) => {
//     const users =  userRepo.create(userData);
//     await userRepo.save(users);
//     return  users;
//   },
//   getAll:async ()=>{
//     const result=await userRepo.find();
//     return result
//   },
//   getOne: async (id: any) => {
//   const user = await userRepo.findOne({where:{id:id}});
//   return user;
//   },
//   update:async(id:any,userData:User)=>{
//   const result=await userRepo.update({id},userData);
//   return result;
//   },
//   delete:async(id:any)=>{
//     const result=await userRepo.delete({id});
//     console.log("result is",result);
//     return result
//   }
// };
class UserService {
    static create(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = (0, typeorm_1.getRepository)(User_1.default);
            const user = userRepo.create(userData);
            yield userRepo.save(user);
            return user;
        });
    }
    static getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = (0, typeorm_1.getRepository)(User_1.default);
            const result = yield userRepo.find({ where: query });
            return result;
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = (0, typeorm_1.getRepository)(User_1.default);
            const user = yield userRepo.findOneBy({ id });
            return user;
        });
    }
    static update(id, userData, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepo = (0, typeorm_1.getRepository)(User_1.default);
            yield userRepo.update(id, userData);
            const updatedUser = yield userRepo.findOneBy({ id });
            if (!updatedUser) {
                return next(new appError_1.default("No user found with that ID", 404));
            }
            return updatedUser;
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = (0, typeorm_1.getRepository)(User_1.default);
            const userToDelete = yield userRepository.findOne({ where: { id } });
            if (!userToDelete) {
                return false;
            }
            yield userRepository.remove(userToDelete);
            return true;
        });
    }
}
exports.default = UserService;
