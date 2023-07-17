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
    booth: Joi.when("role", {
    is: "Staff",
    then: Joi.string().required(),
    otherwise: Joi.valid(null),
    }),
    airLine: Joi.when("role", {
    is: "Air Line Manager",
    then: Joi.string().required(),
    otherwise: Joi.valid(null),
  }),
  createdBy:Joi.string().required()
});
const updateProfile = Joi.object({
  firstName: Joi.string().required(),
  lastName:Joi.string().required(),
 // role:Joi.string().valid("Air Port Manager","Air Line Manager","Staff").optional(),
  phone:Joi.string().when("name", {
    is: Joi.exist(),
    then: Joi.string()
      .pattern(/^\+[1-9]\d{1,14}$/)
      .required(),
    otherwise: Joi.string().allow("").optional(),
  }),
//   booth: Joi.when("role", {
//     is: "Staff",
//     then: Joi.string().required(),
//     otherwise: Joi.valid(null),
//     }),
//   airLine: Joi.when("role", {
//     is: "Air Line Manager",
//     then: Joi.string().required(),
//     otherwise: Joi.valid(null),
//   }),
     updatedBy:Joi.string().required()

 });

export default {registered,updateProfile};
