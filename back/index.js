import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import typeRoutes from "./routes/typeRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Pour servir les images

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/types", typeRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Serveur OK`));