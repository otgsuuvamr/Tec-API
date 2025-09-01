const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  code: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["email", "password"],
    required: true,
  },
  payload: {
    type: Object, // Guarda novos dados (ex: novo e-mail ou nova senha hash)
    required: true,
  },
  expiresAt: {
    type: Date,
    default: () => Date.now() + 1 * 60 * 1000, // expira em 1 min
  },
});

module.exports = mongoose.model("Token", tokenSchema);
