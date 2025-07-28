const Tec = require("../models/tec");

// Cria novos produtos;
exports.create = async (req, res) => {
  const { titulo, preco, descricao, emEstoque } = req.body;
  try {
    // Criação dos produtos;
    const newProd = new Tec({ titulo, preco, descricao, emEstoque: "true" });
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
  const { titulo, preco, descricao, emEstoque } = req.body;
  try {
    const products = await Tec.findByIdAndUpdate(
      // Atualiza o produto por ID;
      id,
      { titulo,
       preco,
       descricao,
       emEstoque,},
      { new: true }
    );
    res.status(200).json({
      message: "Produto atualizado com sucesso: ",
      product: products,
    });
  } catch (error) {
    console.error("Erro Real: ", error);
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

// Lê todas os produtos da base;
exports.read = async (req, res) => {
  try {
    // Busca todos os produtos disponíveis;
    const products = await Tec.find();

    // Conta quantos produtos existem baseado na sua extensão;
    const totalProd = products.length;

    // Retorna com todos os produtos e o total existente;
    res.status(200).json({
      totalProd,
      products,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ erro: "Erro ao ler os produtos da base de dados." });
  }
};

// Lê um único produto pelo ID na base de dados;
exports.readID = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Tec.findById(id); // Busca o produto específico pelo ID;

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    };

    res.status(200).json({
      message: "Produto encontrado: ",
      product: product,
    });
  } catch (error) {
    return res.status(400).json({ error: "Erro ao ler produto." });
  }
};
