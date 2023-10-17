"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const levelOneMenuModel_1 = require("../../entities/levelOneMenuModel");
const levelOneMenuServices = {
    addMenuItem: async (mainMenu, id, text, description) => {
        try {
            const menuItemRepository = (0, typeorm_1.getRepository)(levelOneMenuModel_1.LevelOneMenuEntity);
            const menuItem = menuItemRepository.create({
                mainMenu,
                id: id.toString(),
                text,
                description,
            });
            await menuItemRepository.save(menuItem);
            console.log(`Added menu item with ID ${menuItem.id}`);
            return menuItem;
        }
        catch (err) {
            console.error(err);
            throw new Error("Failed to add menu item");
        }
    },
    getMenuItems: async (mainMenu) => {
        try {
            const menuItemRepository = (0, typeorm_1.getRepository)(levelOneMenuModel_1.LevelOneMenuEntity);
            const menuItems = await menuItemRepository.find({
                where: { mainMenu },
                order: { id: "ASC" },
            });
            const formattedMenuItems = menuItems
                .map((item) => `${item.id}\t${item.text}`)
                .join("\n");
            console.log(`Retrieved ${menuItems.length} sub-menu items`);
            if (formattedMenuItems) {
                return `${formattedMenuItems}\n0 Go back\n# For main menu`;
            }
            else {
                return `Coming soon...\n\n0 Go back\n# For main menu`;
            }
        }
        catch (err) {
            console.error(err);
            throw new Error("Failed to retrieve sub-menu items");
        }
    },
    getMenuDescription: async (mainMenu, id) => {
        try {
            const menuItemRepository = (0, typeorm_1.getRepository)(levelOneMenuModel_1.LevelOneMenuEntity);
            const menuItem = await menuItemRepository.findOne({
                where: { mainMenu, id },
            });
            return menuItem ? menuItem.description : null;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    },
    checkMenu: async (mainMenu, id) => {
        try {
            const menuItemRepository = (0, typeorm_1.getRepository)(levelOneMenuModel_1.LevelOneMenuEntity);
            return await menuItemRepository.findOne({
                where: { mainMenu, id },
            });
        }
        catch (err) {
            console.error(err);
            return null;
        }
    },
};
exports.default = levelOneMenuServices;
setTimeout(function () {
    const menuItems = [
        { mainMenu: '2', levelOneMenuId: "1", text: "Navigation not working ", description: "Please refresh your application and check if you have proper internet connectivity. If still issue persists, please clear cache in your phone settings and try again." },
        { mainMenu: '2', levelOneMenuId: "2", text: "Find my destination ", description: "Please refresh your application and check if you have proper internet connectivity. If still issue persists, please clear cache in your phone settings and try again." },
    ];
});
// setTimeout(function () {
//   const menuItems = [
//     {
//       mainMenu: "3",
//       id: "1",
//       text: "1.	Complain about lost luggage",
//       description:
//         "If you've lost your luggage or need assistance with a lost item, please visit the Lost and Found office located in the baggage claim area. They will assist you in locating your belongings. If you need directions or further help, let me know, and I'll guide you.",
//     },
//     {
//       mainMenu: "3",
//       id: "2",
//       text: "2.	Track your Luggage Complaint",
//       description:
//         "If you've lost your luggage or need assistance with a lost item, please visit the Lost and Found office located in the baggage claim area. They will assist you in locating your belongings. If you need directions or further help, let me know, and I'll guide you.",
//     },
//   ];
//   menuItems.forEach((item) => {
//     levelOneMenuServices.addMenuItem(
//       item.mainMenu,
//       item.id,
//       item.text,
//       item.description
//     );
//   });
// }, 60000); // 1 minute delay
