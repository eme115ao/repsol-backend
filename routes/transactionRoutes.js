const express = require("express");
const Transaction = require("../models/Transaction");
const User = require("../models/User");

const router = express.Router();

// Criar depósito
router.post("/deposit", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const tx = new Transaction({ user: userId, type: "deposit", amount });
    await tx.save();
    res.json({ message: "Depósito pendente de aprovação", tx });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Criar saque
router.post("/withdraw", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    if (user.balance < amount) {
      return res.status(400).json({ error: "Saldo insuficiente" });
    }

    const tx = new Transaction({ user: userId, type: "withdraw", amount });
    await tx.save();
    res.json({ message: "Levantamento pendente de aprovação", tx });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Histórico do usuário
router.get("/:userId", async (req, res) => {
  try {
    const txs = await Transaction.find({ user: req.params.userId });
    res.json(txs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
