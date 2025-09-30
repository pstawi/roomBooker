import express from "express";
import * as typeController from "../controllers/typeController.js";
import checkToken from "../middleware/checkToken.js";

const router = express.Router();

router.use(checkToken);

router.get("/", typeController.getAllTypes);
router.get("/:id", typeController.getTypeById);

export default router;