const Joi = require("joi");

const updateEmailSchema = Joi.object({
  newEmail: Joi.string().email().required().messages({
    "string.email": "Informe um e-mail válido.",
    "any.required": "O novo e-mail é obrigatório.",
  }),
});

module.exports = { updateEmailSchema };
