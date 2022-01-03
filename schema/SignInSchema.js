import Joi from "joi";

const signInSchema = Joi.object().keys({
    email: Joi.string().required(),
    profession: Joi.string().required(),
    password: Joi.string().required()
});

export default signInSchema;