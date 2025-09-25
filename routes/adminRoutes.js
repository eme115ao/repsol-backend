import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

// Aprovar transação
router.post("/approve/:id", async (req, res) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: "Transaction not found" });

    tx.status = "success";
    await tx.save();
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
