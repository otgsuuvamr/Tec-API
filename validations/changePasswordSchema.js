const Joi = require("joi");

const changePasswordSchema = Joi.object({
  currentPass: Joi.string().min(6).required().messages({
    "string.base": "A senha atual deve ser um texto.",
    "string.min": "A senha atual deve ter pelo menos 6 caracteres.",
    "any.required": "A senha atual é obrigatória.",
  }),
  newPass: Joi.string().min(6).required().messages({
    "string.base": "A nova senha deve ser um texto.",
    "string.min": "A nova senha deve ter pelo menos 6 caracteres.",
    "any.required": "A nova senha é obrigatória.",
  }),
  confNewPass: Joi.any().valid(Joi.ref("newPass")).required().messages({
    "any.only": "A confirmação de senha não confere.",
    "any.required": "A confirmação de senha é obrigatória.",
  }),
});

module.exports = { changePasswordSchema };
