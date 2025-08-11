const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/dbTec");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const requireAuth = require("./middlewares/auth/requireAuth");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rotas públicas;
app.use("/auth", userRoutes);

// Middleware de autenticação global;
app.use(requireAuth);

// Rotas privadas (Principal);
app.use("/products", productRoutes);

// Rota de Boas-Vindas;
app.get("/", (req, res) => {
  res.status(200).send("Boas-Vindas à API product");
});

// Inicia o servidor na porta estabelecida;
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando`);
});
