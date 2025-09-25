// cron/dailyIncome.js
const cron = require("node-cron");
const Product = require("../models/Product");
const User = require("../models/User");
const mongoose = require("mongoose");

/**
 * Este cron job roda 1x por dia às 00:00 (meia-noite)
 * e adiciona o rendimento diário ao saldo dos usuários
 * com base nos produtos ativos.
 */
const dailyIncomeJob = () => {
  cron.schedule("0 0 * * *", async () => {
    console.log("⏳ Iniciando processamento de rendimentos diários...");

    try {
      // Buscar todos os produtos comprados
      const products = await Product.find({ active: true });

      for (const product of products) {
        const user = await User.findById(product.userId);

        if (!user) continue;

        // Calcular rendimento diário
        const rendimento = product.amount * (product.dailyRate / 100);

        // Adicionar ao saldo do usuário
        user.balance += rendimento;

        // Registrar histórico (se existir campo transactions)
        user.transactions.push({
          type: "income",
          amount: rendimento,
          description: `Rendimento diário do produto ${product.name}`,
          date: new Date(),
        });

        await user.save();
      }

      console.log("✅ Rendimentos diários processados com sucesso!");
    } catch (err) {
      console.error("❌ Erro ao processar rendimentos diários:", err);
    }
  });
};

module.exports = dailyIncomeJob;
