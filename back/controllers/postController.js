import * as postService from "../services/postService.js";



export const createPost = async (req, res) => {

    console.log('headers:', req.headers['content-type']);
console.log('body:', req.body);
console.log('file:', req.file);
    try {
        console.log('req.body:', req.body);
        console.log('req.file:', req.file);
        const { libelle, typeId, dateDebut, dateFin, lieu, description } = req.body;
        const userId = req.user.id;
        const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

        if (!libelle || !typeId || !dateDebut || !dateFin || !lieu) {
            return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
        }

        const result = await postService.createPost(
            libelle,
            typeId,
            userId,
            dateDebut,
            dateFin,
            lieu,
            description || null,
            imagePath
        );

        res.status(201).json({
            message: 'Post créé avec succès',
            postId: result.insertId
        });
    } catch (error) {
        console.error('Erreur création post:', error);
        res.status(500).json({ error: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.findAllPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const post = await postService.findPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post introuvable" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;
        const { libelle, typeId, dateDebut, dateFin, lieu, description, image } = req.body;

        const post = await postService.findPostById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post introuvable" });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ error: "Non autorisé à modifier ce post" });
        }

        await postService.updatePostById(libelle, postId, typeId, dateDebut, dateFin, lieu, description, image);
        const updatedPost = await postService.findPostById(postId);
        res.json({ message: "Post mis à jour", post: updatedPost });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.user.id;

        const post = await postService.findPostById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post introuvable" });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ error: "Non autorisé à supprimer ce post" });
        }

        await postService.deletePostById(postId);
        res.json({ message: "Post supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};