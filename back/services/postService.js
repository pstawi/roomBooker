import db from "../config/bd.js";

export const createPost = async (libelle, typeId, userId, dateDebut, dateFin, lieu, description, imagePath) => {
    try {
        const query = "INSERT INTO posts (libelle, typeId, userId, dateDebut, dateFin, lieu, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        const [result] = await db.query(query, [libelle, typeId, userId, dateDebut, dateFin, lieu, description, imagePath]);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la création du post: ${error.message}`);
    }
};

export const findAllPosts = async () => {
    const query = "SELECT p.*, t.libelle as type, u.nom, u.prenom FROM posts p JOIN types t ON p.typeId = t.id JOIN users u ON p.userId = u.id ORDER BY p.dateCreation DESC";
    const [rows] = await db.query(query);
    return rows;
};

export const findPostById = async (id) => {
    const query = "SELECT p.*, t.libelle as type, u.nom, u.prenom FROM posts p JOIN types t ON p.typeId = t.id JOIN users u ON p.userId = u.id WHERE p.id = ?";
    const [rows] = await db.query(query, [id]);
    return rows[0];
};

export const updatePostById = async (libelle, typeId, dateDebut, dateFin, lieu, description, image, postId) => {
    const updatePost = `UPDATE posts SET libelle = ?, typeId = ?, dateDebut = ?, dateFin = ?, lieu = ?, description = ?, image = ? WHERE id = ?`;
    await db.query(updatePost, [libelle, typeId, dateDebut, dateFin, lieu, description, image, postId]);
};

export const deletePostById = async (id) => {
    const deletePost = "DELETE FROM posts WHERE id = ?";
    await db.query(deletePost, [id]);
};