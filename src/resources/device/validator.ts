import * as Joi from 'joi';
const addNew = Joi.object({
  deviceIp: Joi.string().required(),
  port:Joi.string().required(),
  userName:Joi.string(),
  Password:Joi.string().required(),
  booth:Joi.string().required(),
  createdBy:Joi.string().required()
});
const updateDevice = Joi.object({
  name: Joi.string().required(),
  location:Joi.string().required(),
  type:Joi.string(),
  updatedBy:Joi.string().required()
});

export default {addNew,updateDevice};
