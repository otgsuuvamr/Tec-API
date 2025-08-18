const Joi = require("joi");

const searchUserSchema = Joi.object({
  name: Joi.string().allow("", null),
  email: Joi.string().email().allow("", null),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10)
});

module.exports = { searchUserSchema };