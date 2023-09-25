"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const mainMenuModel_1 = __importDefault(require("../../entities/mainMenuModel"));
const mainMenuServices = {
    addMenuItem: async (mainMenuId, text) => {
        try {
            const menuItemRepository = (0, typeorm_1.getRepository)(mainMenuModel_1.default);
            const menuItem = menuItemRepository.create({
                mainMenuId: mainMenuId.toString(),
                text,
            });
            await menuItemRepository.save(menuItem);
            console.log(`Added menu item with ID ${menuItem.mainMenuId}`);
            return menuItem;
        }
        catch (err) {
            console.error(err);
            throw new Error("Failed to add menu item");
        }
    },
    getMenuItems: async () => {
        try {
            const menuItemRepository = (0, typeorm_1.getRepository)(mainMenuModel_1.default);
            const menuItems = await menuItemRepository.find({
                order: { mainMenuId: "ASC" }, // Sort by id in ascending order
            });
            const formattedMenuItems = menuItems
                .map((item) => `${item.mainMenuId}\t${item.text}`)
                .join("\n");
            console.log(`Retrieved ${menuItems.length} menu items`);
            return formattedMenuItems;
        }
        catch (err) {
            console.error(err);
            throw new Error("Failed to retrieve menu items");
        }
    },
};
exports.default = mainMenuServices;
//mainMenuServices.addMenuItem('1',"Airport Navigation ")
// setTimeout(function() {
//   const menuItems = [
//     { mainMenuId: '1', service_name: "Airport Navigation" },
//     { mainMenuId: '2', service_name: "Airport Amenities" },
//     { mainMenuId: '3', service_name: "Lost Luggage" },
//     { mainMenuId: '4', service_name: "Staff Complaint" },
//     { mainMenuId: '5', service_name: "Flight Information" },
//     { mainMenuId: '6', service_name: "Connect to Customer Service Representative" },
//   ];
//   menuItems.forEach((item) => {
//     mainMenuServices.addMenuItem(item.mainMenuId, item.service_name);
//   });
// }, 60000); // 1 minute delay
