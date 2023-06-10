import * as Joi from 'joi';
const addNew = Joi.object({
  flightNo: Joi.string().required(),
  destination:Joi.string().required(),
  origin:Joi.string().required(),
 // boardingTime:Joi.date().required(),
  status:Joi.string().valid('in_process','not_initiated','closed').optional(),
  airLine:Joi.string().required(),
  createdBy:Joi.string().required()
});
const updateBooth = Joi.object({
   flightNo: Joi.string().optional(),
  destination:Joi.string().optional(),
  origin:Joi.string().optional(),
 // boardingTime:Joi.date().required(),
  status:Joi.string().valid('in_process','not_initiated','closed').optional(),
  airLine:Joi.string().optional(),
  updatedBy:Joi.string().optional()
});

export default {addNew,updateBooth};
