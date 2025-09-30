import * as typeService from "../services/typeService.js";

export const getAllTypes = async (req, res) => {
    try {
        const types = await typeService.findAllTypes();
        res.json(types);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTypeById = async (req, res) => {
    try {
        const type = await typeService.findTypeById(req.params.id);
        if (!type) {
            return res.status(404).json({ error: "Type introuvable" });
        }
        res.json(type);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};