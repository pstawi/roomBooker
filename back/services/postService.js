import db from "../config/bd.js";

export const createPost = async (typeId, userId, dateDebut, dateFin, lieu, description, image) => {
    const insertPost = `INSERT INTO posts (typeId, userId, dateDebut, dateFin, lieu, description, image) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(insertPost, [typeId, userId, dateDebut, dateFin, lieu, description, image]);
    return { id: result.insertId, typeId, userId, dateDebut, dateFin, lieu, description, image };
};

export const findAllPosts = async () => {
    const query = `SELECT p.*, t.libelle as type, u.nom, u.prenom FROM posts p JOIN types t ON p.typeId = t.id JOIN users u ON p.userId = u.id ORDER BY p.dateCreation DESC`;
    const [rows] = await db.query(query);
    return rows;
};

export const findPostById = async (id) => {
    const query = `SELECT p.*, t.libelle as type, u.nom, u.prenom FROM posts p JOIN types t ON p.typeId = t.id JOIN users u ON p.userId = u.id WHERE p.id = ?`;
    const [rows] = await db.query(query, [id]);
    return rows[0];
};

export const updatePostById = async (id, typeId, dateDebut, dateFin, lieu, description, image) => {
    const updatePost = `UPDATE posts SET typeId = ?, dateDebut = ?, dateFin = ?, lieu = ?, description = ?, image = ? WHERE id = ?`;
    await db.query(updatePost, [ typeId,  dateDebut,  dateFin,  lieu, description, image, id]);
};

export const deletePostById = async (id) => {
    const deletePost = "DELETE FROM posts WHERE id = ?";
    await db.query(deletePost, [id]);
};