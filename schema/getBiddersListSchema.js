import Joi from "joi";

const getBiddersListByBidIdSchema = Joi.object().keys({
    id: Joi.string().required()
});

export default getBiddersListByBidIdSchema;