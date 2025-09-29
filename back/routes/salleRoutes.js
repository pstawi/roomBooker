import express from "express";
import * as salleController from "../controllers/salleController.js";
import { checkToken } from "../middleWare/checkToken.js";

const router = express.Router();

// Routes protégées nécessitant une authentification
router.use(checkToken);

// Créer une nouvelle salle
router.post("/addSalle", salleController.createSalle);

// Obtenir toutes les salles
router.get("/allSalle", salleController.getAllSalles);

// Obtenir une salle spécifique
router.get("/:id", salleController.getSalle);

// Mettre à jour une salle
router.put("/updateSalle/:id", salleController.updateSalle);

// Supprimer une salle
router.delete("/deleteSalle/:id", salleController.deleteSalle);

export default router;
