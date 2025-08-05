const Joi = required("Joi");

const userSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string-base": "Seu nome deve ser no formato de texto.",
    "string-min": "Seu nome deve conter ao menos 2 caracteres.",
    "any.required": "O campo Nome é obrigatório.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "E-mail inválido.",
    "any.required": "O campo E-mail é obrigatório.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Sua senha deve conter ao menos 6 caracteres.",
    "any.required": "O campo Senha é obrigatória.",
  }),
});

module.exports = { userSchema };
