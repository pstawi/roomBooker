import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
// import salleRoutes from "./routes/salleRoutes.js";
// import reservationRoutes from "./routes/reservationRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/salles", salleRoutes);
// app.use("/api/reservations", reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Serveur OK`));