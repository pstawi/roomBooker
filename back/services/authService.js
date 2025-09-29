import db from "../config/bd.js";

export const createUser = async ( nom, prenom, email, password, roleId ) => {
    console.log("Creating user:", { nom, prenom, email, roleId });
    const inserUser = "INSERT INTO users (nom, prenom, email, password, roleId) VALUES (?, ?, ?, ?, ?)";
    const [result] = await db.query(inserUser,[nom, prenom, email, password, roleId]);
    return { id: result.insertId, nom, prenom, email, roleId };
};

export const findUserByEmail = async (email) => {
    const findUser = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(findUser, [email]);
    return rows[0];
};
