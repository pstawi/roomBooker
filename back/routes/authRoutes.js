import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
// route de suppression de compte utilisateur
router.delete("/delete", deleteUser);
// route de modification d'un utilisateur
router.put("/update", updateUser);

export default router;
