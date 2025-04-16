import Joi from "joi";

// create lisitng validator
export const listingValidator = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  pictures:Joi.array().items(Joi.string().required()),
  location: Joi.string().required(),
  amenities: Joi.string().required(),
  category: Joi.string()
    .required()
    .valid(
      "1 Bedroom",
      "2 Bedroom",
      "Single room self-contain",
      "Chamber and hall"
    ),
});

// validator to update listing
export const updateListingValidator = Joi.object({
  name: Joi.string().optional(),
  price: Joi.number().optional(),
  description: Joi.string().optional(),
  amenities: Joi.string().optional(),
  location: Joi.string().optional(),
  pictures: Joi.array().items(Joi.string().optional()),
});

// validator listing id validator

export const listingIdValidator = Joi.object({
  id: Joi.string().required(),
});
