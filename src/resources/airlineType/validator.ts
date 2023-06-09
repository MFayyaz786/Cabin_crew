import Joi from "joi";

export const addNewSchema=Joi.object({
    user:Joi.string().required(),
    name:Joi.string().required()
})
export default {addNewSchema}