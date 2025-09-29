import express from "express";
import { register, login, deleteUser, updateUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/delete", deleteUser);
router.put("/update", updateUser);

export default router;
