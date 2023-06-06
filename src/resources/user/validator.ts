import * as Joi from 'joi';

const userSchema = Joi.object({
  
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  role:Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
  passwordConfirm: Joi.string().required(),
  

});

export default userSchema;
