import Joi from "joi";

const createBidSchema = Joi.object().keys({
    city: Joi.string().required(),
    goodsDescription: Joi.string().required(),
    activeDurationStart: Joi.date().required(),
    activeDurationEnd: Joi.date().required(),
    initialAmount: Joi.number().required(),
    revisions: Joi.number().required()
});

export default createBidSchema;