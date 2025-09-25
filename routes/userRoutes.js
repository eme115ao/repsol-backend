const express = require("express");
const User = require("../models/User");

const router = express.Router();

// Criar novo usuário (simples: só telefone)
router.post("/register", async (req, res) => {
  try {
    const { phone } = req.body;
    const user = new User({ phone });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Ver perfil (com saldo)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
