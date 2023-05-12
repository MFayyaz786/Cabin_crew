import * as Joi from 'joi';
const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  contact:Joi.string().required(),
  address:Joi.string().required(),
  image:Joi.string()
});

export default userSchema;
