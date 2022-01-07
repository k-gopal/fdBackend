import Joi from "joi";

const getBidDetailsSchema = Joi.object().keys({
    id: Joi.string().required(),
    email: Joi.string().required()
});

export default getBidDetailsSchema;