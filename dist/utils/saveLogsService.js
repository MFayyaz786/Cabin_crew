"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const deviceLogs_1 = __importDefault(require("../entities/deviceLogs"));
const processData = async (data) => {
    const entityManager = (0, typeorm_1.getManager)();
    const deviceLogsRepository = entityManager.getRepository(deviceLogs_1.default);
    let savedData = [];
    let queryRunner; // Declare the queryRunner variable
    try {
        queryRunner = entityManager.connection.createQueryRunner(); // Create a new queryRunner
        await queryRunner.connect(); // Connect the queryRunner  
        await queryRunner.startTransaction();
        for (const log of data) {
            // Check if the LogNo already exists in the database
            const existingLog = await deviceLogsRepository.query(`select * from device_logs where "CardNo" = '${log.CardNo}' AND "LogTime" ='${log.LogTime}'`);
            console.log("existingLog", existingLog);
            if (existingLog.length !== 0) {
                // LogNo already exists, you can choose to update the existing log if needed
                // For example, you can do: await deviceLogsRepository.update(existingLog.id, log);
                continue;
            }
            else {
                // LogNo does not exist, so save the log as a new record
                const entity = deviceLogsRepository.create(log);
                const insertResult = await deviceLogsRepository.save(entity);
                savedData.push(insertResult);
            }
        }
        // const entities = deviceLogsRepository.create(data); // Convert array of objects to entities
        // const insertResult = await deviceLogsRepository.save(entities); // Save the entities to the database
        // savedData = insertResult; 
        await queryRunner.commitTransaction();
    }
    catch (error) {
        await queryRunner.rollbackTransaction();
        console.error("Transaction aborted. Error: ", error);
        throw error;
    }
    finally {
        if (queryRunner) {
            await queryRunner.release(); // Make sure to release the queryRunner
        }
    }
    return savedData;
};
exports.default = processData;
