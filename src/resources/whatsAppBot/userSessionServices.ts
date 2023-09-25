import { getRepository } from "typeorm";
import { UserSessionEntity } from "../../entities/userSessionMode";
const userSessionServices = {
  create: async (whatsApp: string, verificationId: any) => {
    try {
      const userSessionRepository = getRepository(UserSessionEntity);
      const result = userSessionRepository.create({ whatsApp, verificationId });
      await userSessionRepository.save(result);
      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create user session");
    }
  },

  updateSession: async (whatsApp: string, session: string) => {
    try {
      const userSessionRepository = getRepository(UserSessionEntity);
      const result = await userSessionRepository.findOne({
        where: { whatsApp },
      });
      if (result) {
        result.session = session;
        await userSessionRepository.save(result);
      }
      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to update user session");
    }
  },

  getByWhatsApp: async (whatsApp: string) => {
    try {
      const userSessionRepository = getRepository(UserSessionEntity);
      const result = await userSessionRepository.findOne({
        where: { whatsApp },
      });
      return result;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to retrieve user session");
    }
  },
};

export default userSessionServices;
