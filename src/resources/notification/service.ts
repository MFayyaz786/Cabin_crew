// notification.service.js
import Notification from "../../entities/notification"
import moment from "moment"
import { getRepository } from "typeorm";
const service={
  // Create a new notification
  createNotification : async (notificationData:any) => {
    const notificationRepo=getRepository(Notification)
   const data=notificationRepo.create(notificationData);
   return await notificationRepo.save(data);
},

// Get all notifications
 getAllNotifications : async (fromDate:any,toDate:any) => {
  toDate = moment(toDate).endOf('day').format("YYYY-MM-DD HH:mm:ss");
  console.log("date",toDate)
  const notificationRepo=getRepository(Notification)
  return await notificationRepo.query(`SELECT id,"notification","intensity","status","createdDate"
FROM notification
WHERE "createdDate" >= '${fromDate}'
AND "createdDate" <= '${toDate}' AND "deleted" = false;
`);
},
// Get a single notification by ID
 getNotificationById : async (notificationId:any) => {
  console.log("id",notificationId)
  const notificationRepo=getRepository(Notification)
  return await notificationRepo.findOne({where:{id:notificationId}});
},

// Update a notification by ID
 updateNotificationById : async (notificationId:any, updatedData:any) => {
    const notificationRepo=getRepository(Notification)
  return await notificationRepo.update({id:notificationId}, updatedData)
},

// Delete a notification by ID
 deleteNotificationById : async (notificationId:any) => {
    const notificationRepo=getRepository(Notification)
  return await notificationRepo.update({id:notificationId},{deleted:true});
},
}
export default service;
