import cron from "node-cron";
import User from "../models/User.js";

// Roda 1 vez por dia às 00h
cron.schedule("0 0 * * *", async () => {
  console.log("Processando rendimentos diários...");
  try {
    const users = await User.find();
    for (const user of users) {
      // Exemplo: crédito fixo de 100Kz/dia (ajustar conforme produto comprado)
      user.balance += 100;
      await user.save();
    }
    console.log("Rendimentos processados com sucesso.");
  } catch (err) {
    console.error("Erro ao processar rendimentos:", err.message);
  }
});
