import db from "../config/bd.js";

export const createSalle = async (libelle) => {
    const insertSalle = "INSERT INTO salles (libelle) VALUES (?)";
    const [result] = await db.query(insertSalle, [libelle]);
    return { id: result.insertId, libelle };
};

export const findSalleByLibelle = async (libelle) => {
    const findSalle = "SELECT * FROM salles WHERE libelle = ?";
    const [rows] = await db.query(findSalle, [libelle]);
    return rows[0];
};

export const findSalleById = async (id) => {
    const findSalle = "SELECT * FROM salles WHERE id = ?";
    const [rows] = await db.query(findSalle, [id]);
    return rows[0];
};

export const getAllSalles = async () => {
    const getSalles = "SELECT * FROM salles";
    const [rows] = await db.query(getSalles);
    return rows;
};

export const deleteSalleById = async (id) => {
    const deleteSalle = "DELETE FROM salles WHERE id = ?";
    await db.query(deleteSalle, [id]);
};

export const updateSalleById = async (id, libelle) => {
    const updateSalle = "UPDATE salles SET libelle = ? WHERE id = ?";
    await db.query(updateSalle, [libelle, id]);
};
