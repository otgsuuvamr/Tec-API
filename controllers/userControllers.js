require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const mongoose = require("mongoose");

function tokenGenerate(user) {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.SECRET,
    { expiresIn: "3h" }
  );
}

exports.register = async (req, res) => {
  const { name, email, password, confPass } = req.body;

  try {
    const exists = await users.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email já cadastrado. " });
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    const hashi = await bcrypt.hash(confPass, salt);

    newUser = new users({ name, email, password: hash });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso! " });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário. " });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await users.findOne({ email: email });
    if (!user)
      return res.status(404).json({ error: "Usuário não encontrado. " });

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res.status(401).json({ error: "password inválida. " });

    const token = tokenGenerate(user);
    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar user. " });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await users.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro interno ao buscar usuário." });
  }
};

exports.updateUser = async (req, res) => {
  const { name } = req.body;

  try {
    const user = await users
      .findByIdAndUpdate(
        req.userId,
        { name },
        { new: true, runValidators: true }
      )
      .select("-password");

    res.json({ message: "Dados atualizados.", user });
  } catch (err) {
    res.status(400).json({ error: "Erro ao atualizar dados." });
  }
};

exports.changePassword = async (req, res) => {
  const { password } = req.body;

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ error: "A nova Senha deve ter pelo menos 6 caracteres." });
  }

  const hash = await bcrypt.hash(password, 10);

  await users.findByIdAndUpdate(req.userId, { password: hash });

  res.json({ message: "Senha alterada com sucesso." });
};

exports.deleteUser = async (req, res) => {
  await users.findByIdAndDelete(req.userId);
  res.json({ message: "Conta excluída com sucesso." });
};

exports.searchUsers = async (req, res) => {
  const { name } = req.query;

  if (!name || name.length < 2) {
    return res
      .status(400)
      .json({ error: "Informe ao menos 2 letras para buscar." });
  }

  const regex = new RegExp(name, "i");
  const resultUsers = await users.find({ name: regex }).select("name email");

  res.json({ results: resultUsers });
};
