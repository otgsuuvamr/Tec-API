const express = require("express"); // Importa a biblioteca express.
require("./config/dbTec");
const prodRoutes = require("./routes/tecRoutes");
const tec = require("./models/tec");

const app = express();
const cors = require("cors");
const PORT = 3000;

// Middleware;
app.use(express.json());
app.use(cors());

// Rota de Boas-Vindas;
app.get("/", (req, res) => {
  res.status(200).send("Boas-Vindas à API Tec");
});

// Caminho dos produtos (Principal);
app.use("/products", prodRoutes);

// Inicia o servidor na porta estabelecida (3000);
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
