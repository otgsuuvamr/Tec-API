const Tec = require("../models/tec");

// Cria novos produtos;
exports.create = async (req, res) => {
  const { titulo, preco, descricao, emEstoque } = req.body;
  try {
    // Criação dos produtos;
    const newProd = new Tec({
      titulo,
      preco,
      descricao,
      emEstoque: emEstoque !== undefined ? emEstoque : true,
    });
    await newProd.save(); // Salve o novo produto no banco;
    res.status(201).json({
      message: "Produto criado com sucesso: ",
      product: newProd,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao incluir novo produto." });
  }
};

// Atualizar produtos já existentes por ID;
exports.update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const existentProd = await Tec.findById(id);

    if (!existentProd) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    // Campos obrigatórios validados pelo middleware

    const updateProd = await Tec.findByIdAndUpdate(id, data, {
      new: true,
    });

    res.status(200).json({
      message: "Produto atualizado com sucesso.",
      product: updateProd,
    });
  } catch (error) {
    console.error("Erro na atualização:", error);
    res.status(500).json({ error: "Erro ao atualizar produto." });
  }
};

// Deleta um produto por ID;
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Tec.findByIdAndDelete(id);
    res.status(200).send("Tarefa deletada com sucesso!");
  } catch (error) {
    return res.status(400).json({ error: "Erro ao remover produto." });
  }
};

// Lê todos os produtos da base;
exports.read = async (req, res) => {
  try {
    const { titulo, minPreco, maxPreco, emEstoque, page, limit, sort, order } =
      req.query;

    const filters = {};
    if (titulo) filters.titulo = { $regex: titulo, $options: "i" };
    if (minPreco || maxPreco) {
      filters.preco = {};
      if (minPreco) filters.preco.$gte = minPreco;
      if (maxPreco) filters.preco.$lte = maxPreco;
    }
    if (emEstoque !== undefined) filters.emEstoque = emEstoque;

    const total = await Tec.countDocuments(filters);

    const products = await Tec.find(filters)
      .sort({ [sort]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      page,
      limit,
      total,
      products,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return res.status(500).json({ error: "Erro ao buscar produtos." });
  }
};

// Lê um único produto pelo ID na base de dados;
exports.readID = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Tec.findById(id); // Busca o produto específico pelo ID;

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    res.status(200).json({
      product: product,
    });
  } catch (error) {
    return res.status(400).json({ error: "Erro ao ler produto." });
  }
};
