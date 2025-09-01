const Joi = require("joi");

const productSearchSchema = Joi.object({
  titulo: Joi.string().allow("", null),
  minPreco: Joi.number().positive(),
  maxPreco: Joi.number().positive(),
  emEstoque: Joi.boolean(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
  sort: Joi.string().valid("titulo", "preco", "createdAt").default("createdAt"),
  order: Joi.string().valid("asc", "desc").default("asc"),
});

module.exports = { productSearchSchema };
