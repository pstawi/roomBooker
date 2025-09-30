import db from "../config/bd.js";

export const createUser = async ( nom, prenom, email, password) => {
    const inserUser = "INSERT INTO users (nom, prenom, email, password, roleId) VALUES (?, ?, ?, ?, 1)";
    const [result] = await db.query(inserUser,[nom, prenom, email, password]);
    return { id: result.insertId, nom, prenom, email, roleId};
};

export const findUserByEmail = async (email) => {
    const findUser = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(findUser, [email]);
    return rows[0];
};

export const findUserById = async (id) => {
    const findUser = "SELECT * FROM users WHERE id = ?";
    const [rows] = await db.query(findUser, [id]);
    return rows[0];
};
export const deleteUserById = async (id) => {
    const deleteUser = "DELETE FROM users WHERE id = ?";
    await db.query(deleteUser, [id]);
};

export const updateUserById = async (id, nom, prenom, email, password) => {
    const updateUser = "UPDATE users SET nom = ?, prenom = ?, email = ?, password = ? WHERE id = ?";
    await db.query(updateUser, [nom, prenom, email, password, id]);
};
