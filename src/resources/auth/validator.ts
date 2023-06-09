import * as Joi from 'joi';
const registered = Joi.object({
  firstName: Joi.string().required(),
  lastName:Joi.string().required(),
  role:Joi.string().required().valid("Air Port Manager","Air Line Manager","Staff"),
  email: Joi.string()
      .email()
      .required()
      .pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/),
  phone: Joi.string()
      .pattern(/^\+[1-9]\d{1,14}$/)
      .required()
      .messages({
        "string.pattern.base":
        "please enter contact with following formate +923xxxxxxxxx",
      }),
  password: Joi.string()
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .messages({
        "string.pattern.base":
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long",
      }),
});
const updateProfile = Joi.object({
  id:Joi.number().required(),
  firstName: Joi.string().required(),
  lastName:Joi.string().required(),
  role:Joi.string().required().valid("Air Port Manager","Air Line Manager","Staff"),
  phone:Joi.string().when("name", {
    is: Joi.exist(),
    then: Joi.string()
      .pattern(/^\+[1-9]\d{1,14}$/)
      .required(),
    otherwise: Joi.string().allow("").optional(),
  }),
});
const requestOtp=Joi.object({
  email:Joi.string().required()
});
const verifyOtpBody=Joi.object({
  email:Joi.string().required(),
  otp:Joi.number().required()
});
const resetPasswordBody=Joi.object({
  id:Joi.string().required(),
password: Joi.string()
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .messages({
        "string.pattern.base":
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long",
      }),
reEnterPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .messages({
        "string.pattern.base":
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long",
        "any.only": "Passwords do not match",
      }),

});
const forgotPasswordBody=Joi.object({
  email:Joi.string().required(),
password: Joi.string()
      .required()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .messages({
        "string.pattern.base":
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long",
      }),
reEnterPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .messages({
        "string.pattern.base":
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character, and be at least 8 characters long",
        "any.only": "Passwords do not match",
      }),
      
})
export default {registered,updateProfile,requestOtp,verifyOtpBody,resetPasswordBody,forgotPasswordBody};
