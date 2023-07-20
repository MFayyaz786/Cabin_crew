import { getManager,getRepository } from "typeorm";
import  model  from "../entities/deviceLogs";
const processData = async ( data: any) => {
  console.log("data",data)
  const entityManager = getRepository(model);
  let savedData=[];
  const queryRunner = entityManager.queryRunner;
  try {
    await queryRunner.startTransaction();
    savedData = await entityManager.save(data);
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    console.error("Transaction aborted. Error: ", error);
    throw error;
  } finally {
    await queryRunner.release();
  }
  return savedData;
};
export default processData;
