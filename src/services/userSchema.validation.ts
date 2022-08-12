import Joi from "joi";

export const userSchema = Joi.object({
  id: Joi.number().id().required(),
  name: Joi.string().required(),
  country: Joi.string().min(5).required(),
  earnings: Joi.string().regex(/^\$\d+(\.\d+)?$/),
});
