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
  const dataSent = req.body;

  try {
    const existentProd = await Tec.findById(id);

    if (!existentProd) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    for (const field in dataSent) {
      if (dataSent[field] === "") {
        delete dataSent[field];
      }
    }

    // Campos obrigatórios se estiverem ausentes no body E nulos no banco;
    const requiredFields = ["titulo", "preco", "descricao", "emEstoque"];
    const finalData = {};

    for (const field of requiredFields) {
      if (dataSent[field] !== undefined) {
        finalData[field] = dataSent[field]; // Dado verificado já foi enviado;
      } else if (
        existentProd[field] === null ||
        existentProd[field] === undefined
      ) {
        return res.status(400).json({
          error: `O campo "${field}" é obrigatório.`,
        });
      } else {
        finalData[field] = existentProd[field]; // Define a verificação igual aos dados do ID;
      }
    }

    const updatedProd = await Tec.findByIdAndUpdate(id, finalData, {
      new: true,
    });

    res.status(200).json({
      message: "Produto atualizado com sucesso.",
      product: updatedProd,
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
    }

    res.status(200).json({
      message: "Produto encontrado: ",
      product: product,
    });
  } catch (error) {
    return res.status(400).json({ error: "Erro ao ler produto." });
  }
};
