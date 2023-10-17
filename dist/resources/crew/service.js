"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const crew_1 = __importDefault(require("../../entities/crew"));
const crewRepo = (0, typeorm_1.getRepository)(crew_1.default);
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
const service = {
    create: async (crewData) => {
        if (crewData.image) {
            const match = crewData.image.match(/^data:(.+);base64,(.+)$/);
            if (!match) {
                throw new Error("Invalid file format");
            }
            const [, fileType, fileData] = match;
            const [fileMainType, fileSubType] = fileType.split("/");
            if (fileMainType !== 'image' || fileSubType !== 'jpeg') {
                throw new Error('Only JPEG images are allowed');
            }
            crewData.image = fileData;
        }
        ;
        const user = crewRepo.create(crewData);
        await crewRepo.save(user);
        //  if(user){
        //   await deviceAPIService.pushRegisterCrew(user.cardNo,user.employId,user.name,user.image)
        // }
        return user;
    },
    getAll: async () => {
        const result = await crewRepo.find({ where: { deleted: false }, relations: ["createdBy", "airLine", "updatedBy"] });
        return result;
    },
    getAllVerified: async (airLine) => {
        const crews = await crewRepo.query(`select id,name,designation,gender,phone,"employId","uniqueId","cardNo" from crew 
where deleted=false AND "isVerified"=true
AND
"airLineId"='${airLine}'`);
        //const result = await crewRepo.find({where:{deleted:false,isVerified:true},relations:["createdBy","airLine","updatedBy"]});
        return crews;
    },
    getCrewsByAirLine: async (airLine) => {
        const options = {
            where: { airLine: { id: airLine }, deleted: false },
            relations: ["createdBy", "airLine", "updatedBy"]
        };
        const result = await crewRepo.find(options);
        //   return result;
        //   const result = await crewRepo.find({where:{airLine:airLine  as AirlineType},relations:["createdBy","airLine","updatedBy"]});
        return result;
    },
    getOne: async (id) => {
        const user = await crewRepo.findOne({ where: { id: id }, relations: ["createdBy", "airLine", "updatedBy"] });
        return user;
    },
    isRegistered: async (employId, cardNo) => {
        const result = await crewRepo.findOne({ where: { employId: employId, cardNo: cardNo,
                isVerified: true,
                //thumbImpression:Not(IsNull())
            } });
        console.log(result);
        return result;
    },
    verifyThumbImpression: async (thumbImpression) => {
        const result = await crewRepo.findOne({ where: { thumbImpression: thumbImpression } });
        return result;
    },
    updateDeliveredStatus: async (id) => {
        const result = await crewRepo.update({ id }, { isDeliveredToDevice: true });
        return result;
    },
    update: async (id, crewData) => {
        if (crewData.image) {
            const match = crewData.image.match(/^data:(.+);base64,(.+)$/);
            if (!match) {
                throw new Error("Invalid file format");
            }
            const [, fileType, fileData] = match;
            const [fileMainType, fileSubType] = fileType.split("/");
            if (fileMainType !== 'image' || fileSubType !== 'jpeg') {
                throw new Error('Only JPEG images are allowed');
            }
            crewData.image = fileData;
        }
        ;
        const result = await crewRepo.update({ id }, crewData);
        return result;
    },
    registerThumb: async (cardNo, thumbImpression) => {
        const result = await crewRepo.query(`UPDATE crew
SET "thumbImpression" = '${thumbImpression}',
    "isVerified" = true
WHERE "cardNo" = '${cardNo}'
`);
        //update({cardNo},{thumbImpression:thumbImpression,isVerified:true});
        console.log("result", result[1]);
        return result[1];
    },
    updateCrewDutyStatus: async (ids, onDuty) => {
        console.log("ids", ids);
        const results = [];
        for (const id of ids) {
            const result = await crewRepo.update({ id: id }, { onDuty });
            results.push(result);
        }
        return results;
    },
    updateNewCrewDutyStatus: async (id, onDuty) => {
        const result = await crewRepo.update({ id: id }, { onDuty });
        return result;
    },
    updateCrewDutyStatus1: async (ids, onDuty) => {
        const results = [];
        for (const id of ids) {
            const result = await crewRepo.update({ id: id.crewId }, { onDuty });
            results.push(result);
        }
        return results;
    },
    delete: async (id) => {
        const result = await crewRepo.update({ id }, { deleted: true });
        return result;
    }
};
exports.default = service;
