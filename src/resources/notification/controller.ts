import { Request,Response ,NextFunction} from "express";
import asyncHandler from "express-async-handler"
import service from "./service"
import AppError from "../../utils/appError";
import validator from "./validator";
const {addNew,update}=validator
// Create a new notification
const createNotification =asyncHandler( async (req:Request, res:Response,next:Function):Promise<any> => {
  try {
     const { error } = addNew.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
    const notification = await service.createNotification(req.body);
    return res.status(201).send({msg:"Notification",data:notification});
  } catch (error) {
   return res.status(500).json({ msg: error.message });
  }
});

// Get all notifications
const getAllNotifications =asyncHandler( async (req:Request, res:Response):Promise<any> => {
  try {
    const notifications = await service.getAllNotifications(req.query.fromDate,req.query.toDate);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ msg:error.message });
  }
});

// Get a single notification by ID
const getNotificationById = asyncHandler(async (req:Request, res:Response,next:Function):Promise<any> => {
  try {
    const notification = await service.getNotificationById(req.params.id);
    if (!notification) {
      return res.status(404).json({ msg: 'Notification not found' });
    }
    res.json(notification);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Update a notification by ID
const updateNotificationById = asyncHandler(async (req:Request, res:Response,next:Function):Promise<any> => {
  try {
  const { error } = update.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message,400));
  }
    const notification = await service.updateNotificationById(req.params.id, req.body);
    if (!notification.affected) {
      return res.status(404).json({ msg: 'Notification not found' });
    }
    res.json({msg:"Notification Updated"});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Delete a notification by ID
const deleteNotificationById =asyncHandler( async (req:Request, res:Response):Promise<any> => {
  try {
    const notification = await service.deleteNotificationById(req.params.id);
    if (!notification.affected) {
      return res.status(404).json({ msg: 'Notification not found' });
    }
    res.json({msg:"Deleted"});
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

export default  {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotificationById,
  deleteNotificationById,
};
