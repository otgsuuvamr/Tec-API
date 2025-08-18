const { productSchema } = require("../../validations/productSchema");

module.exports = (req, res, next) => {
  const body = { ...req.body };

  // Limpa campos vazios (útil para update)
  Object.keys(body).forEach((key) => {
    if (body[key] === "") delete body[key];
  });

  // Valor padrão para emEstoque
  if (req.method === "POST" && body.emEstoque === undefined) {
    body.emEstoque = true;
  }

  if ("emEstoque" in body) {
    if (typeof body.emEstoque === "string") {
      body.emEstoque = body.emEstoque.toLowerCase() === "true";
    } else {
      body.emEstoque = Boolean(body.emEstoque);
    }
  }

  const { error } = productSchema.validate(body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  req.body = body;
  next();
};
