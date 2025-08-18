const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "O e-mail deve ser um texto.",
    "string.email": "O e-mail deve estar em um formato válido.",
    "any.required": "O e-mail é obrigatório."
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "A senha deve ser um texto.",
    "string.min": "A senha deve ter pelo menos 6 caracteres.",
    "any.required": "A senha é obrigatória."
  })
});

module.exports = { loginSchema };