const Joi = require("joi");

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).messages({
    "string.base": "O nome deve ser um texto.",
    "string.min": "O nome deve ter pelo menos 2 caracteres.",
  }),
  email: Joi.string().email().messages({
    "string.base": "O e-mail deve ser um texto.",
    "string.email": "O e-mail deve estar em um formato válido.",
  }),
})
  .min(1)
  .messages({
    "object.min": "Informe ao menos um campo para atualização.",
  });

module.exports = { updateUserSchema };
