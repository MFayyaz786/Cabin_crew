import Joi from "joi";

export const addNewSchema=Joi.object({
    name:Joi.string().required(),
    createdBy:Joi.string().required()
})
export const updateSchema=Joi.object({
    id:Joi.string().required(),
    name:Joi.string().required(),
    updatedBy:Joi.string().required()
})
export default {addNewSchema,updateSchema}