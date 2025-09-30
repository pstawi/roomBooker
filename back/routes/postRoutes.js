import express from "express";
import * as postController from "../controllers/postController.js";
import checkToken from "../middleware/checkToken.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.use(checkToken);

router.post("/", upload.single('image'), postController.createPost);
router.get("/", postController.getAllPosts);
router.get("/:id", postController.getPostById);
router.put("/:id", upload.single('image'), postController.updatePost);
router.delete("/:id", postController.deletePost);

export default router;