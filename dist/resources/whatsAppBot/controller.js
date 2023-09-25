"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sendMessage_1 = __importDefault(require("../../utils/sendMessage"));
const updateSessionString_1 = __importDefault(require("../../utils/updateSessionString"));
const levelOneMenuServices_1 = __importDefault(require("./levelOneMenuServices"));
const getLevel_1 = __importDefault(require("../../utils/getLevel"));
const userSessionServices_1 = __importDefault(require("./userSessionServices"));
const mainMenuServices_1 = __importDefault(require("./mainMenuServices"));
const userSessionMode_1 = require("../../entities/userSessionMode");
const typeorm_1 = require("typeorm");
//* createUser
const configureHook = async (req, res) => {
    let mode = req.query["hub.mode"];
    let challenge = req.query["hub.challenge"];
    let token = req.query["hub.verify_token"];
    const mytoken = "abdulmalik";
    if (mode && token) {
        if (mode == "subscribe" && token === mytoken) {
            res.status(200).send(challenge);
        }
        else {
            res.status(403).send();
        }
    }
    else {
        res.status(400).send();
    }
};
const botHook = async (req, res) => {
    const mainMenu = await mainMenuServices_1.default.getMenuItems();
    if (req.body.entry[0].changes[0].value.statuses) {
        res.sendStatus(200);
        return;
    }
    const { from, text, type, image } = req?.body?.entry[0]?.changes[0]?.value?.messages[0];
    if (!text) {
        await (0, sendMessage_1.default)(from, "Only text is accepted.");
        res.sendStatus(200);
        return;
    }
    const checkUser = await userSessionServices_1.default.getByWhatsApp(from);
    if (!checkUser) {
        const user = await userSessionServices_1.default.create(from, null);
        if (user) {
            await (0, sendMessage_1.default)(from, mainMenu);
            res.sendStatus(200);
            return;
        }
        else {
            (0, sendMessage_1.default)(from, `Sorry your request cannot be initiated`);
            res.sendStatus(200);
            return;
        }
    }
    if (!text) {
        await (0, sendMessage_1.default)(from, "Invalid Message");
        res.sendStatus(200);
        return;
    }
    if (text) {
        console.log({ body: text.body, session: checkUser.session });
        console.log({ body: isNaN(text.body), session: checkUser.session == "#" });
        if (text.body == "#") {
            await (0, sendMessage_1.default)(from, mainMenu);
            checkUser.session = "#";
            const userSessionRepository = (0, typeorm_1.getRepository)(userSessionMode_1.UserSessionEntity);
            userSessionRepository.save(checkUser);
            res.sendStatus(200);
            return;
        }
        else if (text.body == 0) {
            const userSessionRepository = (0, typeorm_1.getRepository)(userSessionMode_1.UserSessionEntity);
            const checkLevel = (0, getLevel_1.default)(checkUser.session);
            if (checkLevel.level == 0 || checkLevel.level == 1) {
                checkUser.session = "#";
                await userSessionRepository.save(checkUser);
                await (0, sendMessage_1.default)(from, mainMenu);
                res.sendStatus(200);
                return;
            }
            else if (checkLevel.level == 2) {
                checkUser.session = (0, updateSessionString_1.default)(checkUser.session, null, false);
                await userSessionRepository.save(checkUser);
                const levelOneMenu = await levelOneMenuServices_1.default.getMenuItems(checkLevel.menu
                // checkLevel.subMenu
                );
                await (0, sendMessage_1.default)(from, levelOneMenu);
                res.sendStatus(200);
                return;
            }
        }
        else if (isNaN(text.body) && checkUser.session == "#") {
            await (0, sendMessage_1.default)(from, mainMenu);
            res.sendStatus(200);
            return;
        }
        else if (isNaN(text.body)) {
            await (0, sendMessage_1.default)(from, "Invalid input");
            res.sendStatus(200);
            return;
        }
        else {
            const userSessionRepository = (0, typeorm_1.getRepository)(userSessionMode_1.UserSessionEntity);
            if (checkUser.session == "#" && text.body >= 1 && text.body <= 6) {
                const levelOneMenu = await levelOneMenuServices_1.default.getMenuItems(text.body);
                checkUser.session = (0, updateSessionString_1.default)(checkUser.session, text.body, true);
                await userSessionRepository.save(checkUser);
                await (0, sendMessage_1.default)(from, levelOneMenu);
                res.sendStatus(200);
            }
            else {
                const checkLevel = (0, getLevel_1.default)(checkUser.session);
                if (checkLevel.level == 1) {
                    const checkMenu = await levelOneMenuServices_1.default.checkMenu(checkLevel.menu, text.body);
                    if (checkMenu) {
                        await (0, sendMessage_1.default)(from, checkMenu.description +
                            "\n\n" +
                            "0 Go back" +
                            "\n" +
                            "# For main menu");
                        res.sendStatus(200);
                        checkUser.session = (0, updateSessionString_1.default)(checkUser.session, text.body, true);
                        await userSessionRepository.save(checkUser);
                        return;
                    }
                    else {
                        await (0, sendMessage_1.default)(from, "Invalid input");
                        res.sendStatus(200);
                        return;
                    }
                }
                await (0, sendMessage_1.default)(from, "Invalid input");
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
exports.default = { configureHook, botHook };
