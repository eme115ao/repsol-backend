const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nome do produto/investimento
  amount: { type: Number, required: true }, // Valor investido
  dailyRate: { type: Number, required: true }, // Taxa de rendimento diário (%)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Dono do produto
  active: { type: Boolean, default: true }, // Se ainda está ativo
  createdAt: { type: Date, default: Date.now }, // Data da compra
});

module.exports = mongoose.model("Product", productSchema);
