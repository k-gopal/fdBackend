import Joi from "joi";

const getActiveBidByEmailSchema = Joi.object().keys({
    email: Joi.string().required(),
    limit: Joi.number().required()
});

export default getActiveBidByEmailSchema;