const mongoose = require("mongoose"); // Importa a biblioteca do MongoDB.

const tecSchema = new mongoose.Schema({
  // Tabela: Schema; Campos: titulo, preco, descricao e status;
  titulo: { 
    type: String, 
    required: true, 
  },
  preco: { 
    type: Number, 
    required: true, 
  },
  descricao: { 
    type: String, 
    required: true, 
  },
  emEstoque: { 
    type: Boolean, 
    required: true, 
  },
}, { timestamps: true });

module.exports = mongoose.model("Tec", tecSchema); 