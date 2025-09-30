import * as postService from "../services/postService.js";

export const createPost = async (req, res) => {
    try {
        const { typeId, dateDebut, dateFin, lieu, description, image } = req.body;
        const userId = req.user.id;

        if (!typeId || !dateDebut || !dateFin || !lieu) {
            return res.status(400).json({ error: "Champ obligatoire manquant" });
        }

        const post = await postService.createPost(typeId, userId, dateDebut, dateFin, lieu, description, image);
        res.status(201).json({ message: "Post créé", post });
    } catch (error) {
        res.status(400).json({ error: error.message });
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
        const { typeId, dateDebut, dateFin, lieu, description, image } = req.body;

        const post = await postService.findPostById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post introuvable" });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ error: "Non autorisé à modifier ce post" });
        }

        await postService.updatePostById(postId, typeId, dateDebut, dateFin, lieu, description, image);
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