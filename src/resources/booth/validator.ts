import * as Joi from 'joi';
const addNew = Joi.object({
  name: Joi.string().required(),
  location:Joi.string().required(),
  type:Joi.string(),
  createdBy:Joi.string().required()
});
const updateBooth = Joi.object({
  name: Joi.string().required(),
  location:Joi.string().required(),
  type:Joi.string(),
  updatedBy:Joi.string().required()
});

export default {addNew,updateBooth};
