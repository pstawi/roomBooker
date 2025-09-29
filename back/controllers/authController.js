import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  try {
    console.log(req.body.nom);
    const { nom, prenom, email, password, roleId } = req.body;
    if (!nom || !prenom || !email || !password) {
      return res.status(400).json({ error: "champ manquant" });
    }

    console.log(nom);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authService.createUser(nom, prenom, email, hashedPassword, roleId);

    res.status(201).json({ message: "Utilisateur créé", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Mot de passe incorrect" });

    const token = jwt.sign({ id: user.id, email: user.email, roleId: user.roleId },process.env.JWT_SECRET,{ expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id} = req.body;
    const user = await authService.findUserById(id);
    if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });
    await authService.deleteUserById(id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, nom, prenom, email, password } = req.body;
    const user = await authService.findUserById(id);
    if (!user) return res.status(404).json({ error: "Utilisateur introuvable" });

    const updatedUser = await authService.updateUser(id, { nom, prenom, email, password });
    res.json({ message: "Utilisateur mis à jour", user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
