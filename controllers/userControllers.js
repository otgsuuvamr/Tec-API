require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const mongoose = require("mongoose");



exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await users.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email já cadastrado. " });
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new users({ name, email, password: hash });
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

    function tokenGenerate(user) {
      return jwt.sign(
        { id: user._id, name: user.name, email: user.email },
        process.env.SECRET,
        { expiresIn: "3h" }
      );
    }

    const token = tokenGenerate(user);
    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar user. " });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await users.findById(req.userId).select("-password");
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
  const updates = req.body;

  try {
    const user = await users
      .findByIdAndUpdate(
        req.userId,
        updates,
        { new: true, runValidators: true }
      )
      .select("-password");

      if(!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

    res.json({ message: "Dados atualizados.", user: user });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno ao atualizar usuário." });
  }
};

exports.changePassword = async (req, res) => {
  try {
  const { currentPass, newPass } = req.body;

  const user = await users.findById(req.userId);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  const validPass = await bcrypt.compare(currentPass, user.password);
  if (!validPass) {
    return res.status(400).json({ error: "Senha atual incorreta. "});
  }

  user.password = await bcrypt.hash(newPass, 10);

  await users.findByIdAndUpdate(req.userId, { password: hash });

  res.json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    res.status(500).json({ error: "Erro interno ao alterar senha." });
  };
};

exports.deleteUser = async (req, res) => {
  try {
    await users.findByIdAndDelete(req.userId);
    res.json({ message: "Conta excluída com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir conta:", error);
    res.status(500).json({ error: "Erro interno ao excluir conta." });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { name, email, page = 1, limit = 10 } = req.query;

    const filters = {};
    if (name) filters.nome = { $regex: name, $options: "i" };
    if (email) filters.email = { $regex: email, $options: "i" };

    const usersResult = await users.find(filters)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total: usersResult.length, usersResult });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno ao buscar usuários." });
  }
};
