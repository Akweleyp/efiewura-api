import Joi from "joi";

// Create booking validator
export const bookingValidator = Joi.object({
    name: Joi.string().required(),
    preferredDate: Joi.date().required(),
    contact: Joi.number().required(),
    listingId: Joi.string().required(),
});

