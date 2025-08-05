require("dotenv").config();
const express = require("express"); // Importa a biblioteca express.
const cors = require("cors");
const conDB = require("./config/dbTec");
const tecRoutes = require("./routes/tecRoutes");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middlewares/auth");

const app = express();

// Middleware;
app.use(cors());
app.use(express.json());
conDB();

// Rota de Boas-Vindas;
app.get("/", (req, res) => {
  res.status(200).send("Boas-Vindas à API Tec");
});

// Caminho dos produtos (Principal);
app.use("/products", auth, tecRoutes);

// Caminho de Login/Cadastro;
app.use("/auth", authRoutes);

// Caminho público;
app.use("/public", express.static("public"));

// Inicia o servidor na porta estabelecida;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando`);
});
