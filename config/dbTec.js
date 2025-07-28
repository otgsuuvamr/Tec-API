const mongoose = require("mongoose"); // Importa a biblioteca do MongoDB.

mongoose.set("strictQuery", true);

require("dotenv").config(); // Criptografa os dados de acesso do DB

// Credenciais do DB
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

async function main() {
  // Conexão com o banco estabelecida
  await mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPass}@projectapi.mkgylgr.mongodb.net/?retryWrites=true&w=majority&appName=ProjectAPI`
  );

  console.log("Conexão bem sucedida.");
}
main().catch((err) => console.log(err));

module.exports = main;
