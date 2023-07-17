import Joi from "joi";
const addNew=Joi.object({
    notification:Joi.string().required(), 
    intensity:Joi.string().required().valid("low","medium","high"),
    deliverTo:Joi.array().required().items(
    Joi.string().valid("Air Port Manager"),
    Joi.string().valid("Air Line Manager"),
    Joi.string().valid("Staff")
  ).min(1),
    createdBy:Joi.string().required()   
})
const update=Joi.object({
    notification:Joi.string().optional(), 
    intensity:Joi.string().optional().valid("low","medium","high"),
    deliverTo:Joi.array().optional().items(
    Joi.string().valid("Air Port Manager"),
    Joi.string().valid("Air Line Manager"),
    Joi.string().valid("Staff")
  ),
    status:Joi.string().optional().valid("pending","resolved","reviewed"),
    updatedBy:Joi.string().required()   
})
export default {addNew,update}