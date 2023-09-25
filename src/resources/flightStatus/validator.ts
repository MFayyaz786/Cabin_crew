import * as Joi from 'joi';
const addNew = Joi.object({
  status: Joi.string().required().valid("On-Time","Arrived","Delayed","Expected","Canceled","Check-In","Check-In-Closed","Departed"),
  createdBy:Joi.string().required()
});
const updateBooth = Joi.object({
  status: Joi.string().optional().valid("On-Time","Arrived","Delayed","Expected","Canceled","Check-In","Check-In-Closed","Departed"),
  updatedBy:Joi.string().required()
});

export default {addNew,updateBooth};
