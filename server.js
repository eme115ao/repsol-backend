require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);

// Conexão
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/repsol")
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("MongoDB connection failed:", err));

  // Importar cron job
const dailyIncomeJob = require("./cron/dailyIncome");

// Iniciar o job
dailyIncomeJob();
