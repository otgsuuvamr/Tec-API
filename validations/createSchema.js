const joi = require("joi");

const createSchema = joi.object({
  titulo: joi.string().min(2).required().messages({
    'string.base': 'O título deve ser um texto.',
    'string.empty': 'O título é obrigatório.',
    'string.min': 'O título deve ter pelo menos 2 caracteres.',
    'any.required': 'O título é obrigatório.'
  }),
  preco: joi.number().positive().required().messages({
    'number.base': 'O preço deve ser um número.',
    'number.positive': 'O preço deve ser positivo.',
    'any.required': 'O preço é obrigatório.'
  }),
  descricao: joi.string().min(3).required().messages({
    'string.base': 'Incluir apenas formato de texto.',
    'string.empty': 'Descrição obrigatória',
    'string.min': 'Conter no mínimo 3 caracteres',
    'any.required': 'Descrição obrigatória'
  }),
  emEstoque: joi.boolean().required().messages({
    'boolean.base': 'O campo "emEstoque" deve ser verdadeiro ou falso.'
  }),
});

module.exports = { createSchema };