import * as Joi from 'joi';
const addNew = Joi.object({
  name: Joi.string().required(),
  location:Joi.string().required(),
  type:Joi.string()
});
const updateBooth = Joi.object({
  name: Joi.string().required(),
  location:Joi.string().required(),
  type:Joi.string()
});

export default {addNew,updateBooth};
