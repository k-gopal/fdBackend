import Joi from "joi";

const listActiveBidSchema = Joi.object().keys({
    limit: Joi.number().required()
});

export default listActiveBidSchema;