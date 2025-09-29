import * as salleService from "../services/salleServices.js";

export const createSalle = async (req, res) => {
    try {
        const { libelle } = req.body;
        if (!libelle) {
            return res.status(400).json({ error: "Le libellé est requis" });
        }

        // Vérifier si une salle avec le même libellé existe déjà
        const existingSalle = await salleService.findSalleByLibelle(libelle);
        if (existingSalle) {
            return res.status(400).json({ error: "Une salle avec ce nom existe déjà" });
        }

        const salle = await salleService.createSalle(libelle);
        res.status(201).json({ salle });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getSalle = async (req, res) => {
    try {
        const { id } = req.params;
        const salle = await salleService.findSalleById(id);
        if (!salle) return res.status(404).json({ error: "Salle introuvable" });
        res.json(salle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllSalles = async (req, res) => {
    try {
        const salles = await salleService.getAllSalles();
        res.json(salles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSalle = async (req, res) => {
    try {
        const { id } = req.params;
        const { libelle } = req.body;

        if (!libelle) {
            return res.status(400).json({ error: "libellé requis" });
        }

        const salle = await salleService.findSalleById(id);
        if (!salle) return res.status(404).json({ error: "Salle introuvable" });

        const existingSalle = await salleService.findSalleByLibelle(libelle);
        if (existingSalle && existingSalle.id !== parseInt(id)) {
            return res.status(400).json({ error: "libellé existant" });
        }

        await salleService.updateSalleById(id, libelle);
        res.json({ message: "Salle mise à jour" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSalle = async (req, res) => {
    try {
        const { id } = req.params;
        const salle = await salleService.findSalleById(id);
        if (!salle) return res.status(404).json({ error: "Salle introuvable" });
        
        await salleService.deleteSalleById(id);
        res.json({ message: "Salle supprimée" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
