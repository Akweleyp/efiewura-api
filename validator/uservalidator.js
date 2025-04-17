import Joi from "joi";

export const registerUserValidator = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .required(),
  email: Joi.string().email({ tlds: { allow: ['com', 'org', 'net'] } }).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")),

  // role is optional, it is set to default user if it is not indicated or selected.
  role: Joi.string().valid("user", "tenant", "landlord").optional(),
}).with("password", "confirmPassword");

export const loginUserValidator = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const updateUserValidator = Joi.object({
  firstName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .optional(),
  lastName: Joi.string()
    .regex(/^[A-Za-z]+$/)
    .optional(),
  email: Joi.string().optional(),
  password: Joi.string().optional(),
  confirmPassword: Joi.string().optional(),
  role: Joi.string().valid("user", "landlord"),
});
