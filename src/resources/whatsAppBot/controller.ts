import { Request, Response, NextFunction } from "express";
import sendMessage from "../../utils/sendMessage";
import updateSessionString from "../../utils/updateSessionString";
import levelOneMenuServices from "./levelOneMenuServices";
import getLevel from "../../utils/getLevel";
import userSessionServices from "./userSessionServices";
import mainMenuServices from "./mainMenuServices";
import { UserSessionEntity } from "../../entities/userSessionMode";
import { getRepository } from "typeorm";

//* createUser
const configureHook = async (req: Request, res: Response) => {
  let mode = req.query["hub.mode"];
  let challenge = req.query["hub.challenge"];
  let token = req.query["hub.verify_token"];
  const mytoken: string = "abdulmalik";
  if (mode && token) {
    if (mode == "subscribe" && token === mytoken) {
      res.status(200).send(challenge);
    } else {
      res.status(403).send();
    }
  } else {
    res.status(400).send();
  }
};

const botHook = async (req: Request, res: Response) => {
  const mainMenu = await mainMenuServices.getMenuItems();
  if (req.body.entry[0].changes[0].value.statuses) {
    res.sendStatus(200);
    return;
  }
  const { from, text, type, image } =
    req?.body?.entry[0]?.changes[0]?.value?.messages[0];

  if (!text) {
    await sendMessage(from, "Only text is accepted.");
    res.sendStatus(200);
    return;
  }

  const checkUser = await userSessionServices.getByWhatsApp(from);

  if (!checkUser) {
    const user = await userSessionServices.create(from, null);
    if (user) {
      await sendMessage(from, mainMenu);
      res.sendStatus(200);
      return;
    } else {
      sendMessage(from, `Sorry your request cannot be initiated`);
      res.sendStatus(200);
      return;
    }
  }
  if (!text) {
    await sendMessage(from, "Invalid Message");
    res.sendStatus(200);
    return;
  }

  if (text) {
    console.log({ body: text.body, session: checkUser.session });
    console.log({ body: isNaN(text.body), session: checkUser.session == "#" });
    if (text.body == "#") {
      await sendMessage(from, mainMenu);
      checkUser.session = "#";
      const userSessionRepository = getRepository(UserSessionEntity);
      userSessionRepository.save(checkUser);
      res.sendStatus(200);
      return;
    } else if (text.body == 0) {
      const userSessionRepository = getRepository(UserSessionEntity);
      const checkLevel = getLevel(checkUser.session);
      if (checkLevel.level == 0 || checkLevel.level == 1) {
        checkUser.session = "#";
        await userSessionRepository.save(checkUser);

        await sendMessage(from, mainMenu);
        res.sendStatus(200);
        return;
      } else if (checkLevel.level == 2) {
        checkUser.session = updateSessionString(checkUser.session, null, false);
        await userSessionRepository.save(checkUser);
        const levelOneMenu = await levelOneMenuServices.getMenuItems(
          checkLevel.menu
          // checkLevel.subMenu
        );

        await sendMessage(from, levelOneMenu);
        res.sendStatus(200);
        return;
      }
    } else if (isNaN(text.body) && checkUser.session == "#") {
      await sendMessage(from, mainMenu);
      res.sendStatus(200);
      return;
    } else if (isNaN(text.body)) {
      await sendMessage(from, "Invalid input");
      res.sendStatus(200);
      return;
    } else {
      const userSessionRepository = getRepository(UserSessionEntity);
      if (checkUser.session == "#" && text.body >= 1 && text.body <= 6) {
        const levelOneMenu = await levelOneMenuServices.getMenuItems(text.body);
        checkUser.session = updateSessionString(
          checkUser.session,
          text.body,
          true
        );
        await userSessionRepository.save(checkUser);
        await sendMessage(from, levelOneMenu);
        res.sendStatus(200);
      } else {
        const checkLevel = getLevel(checkUser.session);
        if (checkLevel.level == 1) {
          const checkMenu = await levelOneMenuServices.checkMenu(
            checkLevel.menu,
            text.body
          );
          if (checkMenu) {
            await sendMessage(
              from,
              checkMenu.description +
                "\n\n" +
                "0 Go back" +
                "\n" +
                "# For main menu"
            );
            res.sendStatus(200);
            checkUser.session = updateSessionString(
              checkUser.session,
              text.body,
              true
            );
            await userSessionRepository.save(checkUser);
            return;
          } else {
            await sendMessage(from, "Invalid input");
            res.sendStatus(200);
            return;
          }
        }
        await sendMessage(from, "Invalid input");
        res.sendStatus(200);
        return;
      }
    }
  }
  // if (req.body.entry[0].changes[0].value.statuses) {
  //   res.sendStatus(200);
  //   return;
  // }
  // const {
  //   from,
  //   text,
  //   type,
  //   image,
  // }: { from: string; text: string; type: string; image: string } =
  //   req?.body?.entry[0]?.changes[0]?.value?.messages[0];

  // if (!text) {
  //   await sendMessage(from, 'Only text is accepted.');
  //   res.sendStatus(200);
  //   return;
  // } else {
  //   await sendMessage(from, 'Hello from bot.');
  //   res.sendStatus(200);
  //   return;
  // }
};
export default { configureHook, botHook };
