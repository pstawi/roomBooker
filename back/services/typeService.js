import db from "../config/bd.js";

export const findAllTypes = async () => {
    const query = "SELECT * FROM types ORDER BY libelle";
    const [rows] = await db.query(query);
    return rows;
};

export const findTypeById = async (id) => {
    const query = "SELECT * FROM types WHERE id = ?";
    const [rows] = await db.query(query, [id]);
    return rows[0];
};