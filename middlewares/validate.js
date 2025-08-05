module.exports =
  (schema, isCreate = false) =>
  (req, res, next) => {
    const body = { ...req.body };

    for (const campo in body) {
      if (body[campo] === "") {
        delete body[campo];
      }
    }

    // Se for criação (POST), exigir os campos obrigatórios
    const requiredFields = ["titulo", "preco", "descricao"];

    if (isCreate) {
      for (const field of requiredFields) {
        if (
          body[field] === undefined ||
          body[field] === null ||
          body[field] === ""
        ) {
          return res.status(400).json({
            error: `O campo "${field}" é obrigatório.`,
          });
        }
      }
    }

    const { error } = schema.validate(body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    req.body = body; // salva modificado (com emEstoque = true, por exemplo)
    next();
  };
