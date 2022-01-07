import Joi from "joi";

const setBiddingSchema = Joi.object().keys({
    id: Joi.string().required(),
    price: Joi.number().required(),
    revisions: Joi.number().required(),
    email: Joi.string().required()
});

export default setBiddingSchema;