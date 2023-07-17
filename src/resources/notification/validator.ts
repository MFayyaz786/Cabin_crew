import Joi from "joi";
const addNew=Joi.object({
    notification:Joi.string().required(), 
    createdBy:Joi.string().required()   
})
const update=Joi.object({
    notification:Joi.string().optional(), 
    intensity:Joi.string().optional().valid("low","medium","high"),
    status:Joi.string().optional().valid("pending","resolved","reviewed"),
    updatedBy:Joi.string().required()   
})
export default {addNew,update}