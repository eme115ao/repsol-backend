import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// ✅ Rota de teste
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is running ✅" });
});

// Conectar ao MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Aqui você pode importar e usar as rotas
// exemplo:
// import userRoutes from "./routes/user.js";
// app.use("/api/users", userRoutes);

// Configuração da porta
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
