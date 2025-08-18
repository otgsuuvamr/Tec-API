require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require("mongoose");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email já cadastrado. " });
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hash });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso! " });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário. " });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado. " });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ error: "Senha inválida. " });
    }

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({
      message: "Login bem-sucedido!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro ao realizar login. " });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
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
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json({ message: "Dados atualizados.", user: user });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ error: "Erro interno ao atualizar usuário." });
  }
};

exports.updateEmail = async (req, res) => {
  try {
    const { newEmail } = req.body;

    // Verifica se o email já está cadastrado
    const exists = await User.findOne({ email: newEmail });
    if (exists) {
      return res.status(400).json({ error: "Este e-mail já está em uso." });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { email: newEmail },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    res.json({ message: "E-mail atualizado com sucesso.", user });
  } catch (error) {
    console.error("Erro ao atualizar e-mail:", error);
    res.status(500).json({ error: "Erro interno ao atualizar e-mail." });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPass, newPass } = req.body;

    const user = await User.findById(req.user.id).select("+password");
    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado." });
    }

    const validPass = await bcrypt.compare(currentPass, user.password);
    if (!validPass) {
      return res.status(400).json({ error: "Senha atual incorreta. " });
    }

    const hash = await bcrypt.hash(newPass, 12);
    user.password = hash;
    await user.save();

    res.json({ message: "Senha alterada com sucesso." });
  } catch (error) {
    console.error("Erro ao alterar senha:", error);
    res.status(500).json({ error: "Erro interno ao alterar senha." });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
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
    if (name) filters.name = { $regex: name, $options: "i" };
    if (email) filters.email = { $regex: email, $options: "i" };

    const usersResult = await User.find(filters)
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ total: usersResult.length, usersResult });
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ error: "Erro interno ao buscar usuários." });
  }
};
