const Joi = require("joi");

const searchUserSchema = Joi.object({
  name: Joi.string().allow("", null),
  email: Joi.string().allow("", null), // removi .email() para permitir busca parcial
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
  sort: Joi.string().valid("name", "email", "createdAt").default("createdAt"),
  order: Joi.string().valid("asc", "desc").default("asc"),
});

module.exports = { searchUserSchema };
