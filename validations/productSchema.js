const Joi = require("Joi");

const productSchema = Joi.object({
  titulo: Joi.string().min(2).optional().messages({
    "string.base": "O título deve ser um texto.",
    "string.min": "O título deve ter pelo menos 2 caracteres.",
  }),
  preco: Joi.number().positive().optional().messages({
    "number.base": "O preço deve ser um número.",
    "number.positive": "O preço deve ser positivo.",
  }),
  descricao: Joi.string().min(3).optional().messages({
    "string.base": "A descrição deve ser um texto.",
    "string.min": "A descrição deve ter pelo menos 3 caracteres.",
  }),
  emEstoque: Joi.boolean().default(true),
});

module.exports = { productSchema };
