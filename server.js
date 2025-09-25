require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Conexão ao MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Rota simples para teste
app.get("/", (req, res) => {
  res.send("Backend Repsol funcionando 🚀");
});

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
