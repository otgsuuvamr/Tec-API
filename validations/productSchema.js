const joi = require("joi");

const productSchema = joi.object({
    titulo: joi.string().min(2).optional().messages({
      'string.base': 'O título deve ser um texto.',
      'string.min': 'O título deve ter pelo menos 2 caracteres.'
    }),
    preco: joi.number().positive().optional().messages({
      'number.base': 'O preço deve ser um número.',
      'number.positive': 'O preço deve ser positivo.'
    }),
    descricao: joi.string().min(3).optional().messages({
      'string.base': 'A descrição deve ser um texto.',
      'string.min': 'A descrição deve ter pelo menos 3 caracteres.'
    }),
    emEstoque: joi.boolean().optional().messages({
      'boolean.base': 'O campo emEstoque deve ser verdadeiro ou falso.'
    })
  });

module.exports = { productSchema };