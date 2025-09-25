const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, enum: ["deposit", "withdraw"], required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "success"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);
