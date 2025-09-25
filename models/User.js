const mongoose = require("mongoose");

// Estrutura de cada transação
const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ["deposit", "withdrawal", "income"], required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

// Estrutura do usuário
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome do usuário
  email: { type: String, required: true, unique: true }, // Email único
  password: { type: String, required: true }, // Senha (vamos criptografar depois)
  balance: { type: Number, default: 0 }, // Saldo acumulado
  transactions: [transactionSchema], // Histórico de transações
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
