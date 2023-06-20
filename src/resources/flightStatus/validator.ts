import * as Joi from 'joi';
const addNew = Joi.object({
  name: Joi.string().required(),
  createdBy:Joi.string().required()
});
const updateBooth = Joi.object({
  name: Joi.string().required(),
  updatedBy:Joi.string().required()
});

export default {addNew,updateBooth};
