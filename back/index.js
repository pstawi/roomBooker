import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import typeRoutes from "./routes/typeRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/types", typeRoutes);


// N'écoutez le port que si ce n'est pas un test
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(` Serveur OK`));
}

export { app };