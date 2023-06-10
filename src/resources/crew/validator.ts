import * as Joi from 'joi';
import { JoinColumn } from 'typeorm';
const addNew = Joi.object({
  employId: Joi.string().required(),
  airLine:Joi.string().required(),
  name:Joi.string().required(),
  gender:Joi.string().valid('male','female'),
  destination:Joi.string().optional(),
  uniqueId:Joi.string().optional(),
  designation:Joi.string().valid('captain','airhostess').required(),
  phone:Joi.string()
      .pattern(/^\+[1-9]\d{1,14}$/)
      .required()
      .messages({
        "string.pattern.base":
        "please enter contact with following formate +923xxxxxxxxx",
      }),
  createdBy:Joi.string().required()     
});
const updateCrew = Joi.object({
  name:Joi.string(),
  gender:Joi.string().valid('male','female').optional(),
  destination:Joi.string().optional(),
  designation:Joi.string().valid('captain','airhostess').optional(),
  phone:Joi.string()
      .pattern(/^\+[1-9]\d{1,14}$/)
      .messages({
        "string.pattern.base":
        "please enter contact with following formate +923xxxxxxxxx",
      }).optional(),
  updatedBy:Joi.string().required()     
});


export default {addNew,updateCrew};
