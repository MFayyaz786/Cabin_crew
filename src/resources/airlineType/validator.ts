import Joi from "joi";

export const addNewSchema=Joi.object({
    name:Joi.string().required()
})
export default {addNewSchema}