require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const mongoose = require("mongoose");

exports.register = async (req, res) => {
  const { name, email, password, confpass } = req.body;

  try {
    const exists = await User.findOne({ email: email });
    if (exists) {
      return res.status(400).json({ error: "Email já cadastrado. " });
    }

    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    newUser = new User({ name, email, password: hash });
    await newUser.save();

    res.status(201).json({ message: "Usuário registrado com sucesso! " });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário. " });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const login = await User.findOne({ email: email });
    if (!login)
      return res.status(404).json({ error: "Usuário não encontrado. " });

    const isValid = await bcrypt.compare(password, login.password);
    if (!isValid) return res.status(401).json({ error: "Senha inválida. " });

    const token = jwt.sign(
      { id: login._id, name: login.name },
      process.env.SECRET,
      { expiresIn: "3h" }
    );

    res.status(200).json({ message: "Login bem-sucedido!", token });
  } catch (error) {
    res.status(500).json({ error: "Erro ao realizar login. " });
  }
};
