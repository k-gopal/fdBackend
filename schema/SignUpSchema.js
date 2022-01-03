import Joi from "joi";

const signUpSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required(),
    profession: Joi.string().required(),
    password: Joi.string().required()
});

export default signUpSchema;