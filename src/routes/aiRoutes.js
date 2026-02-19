import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { analyzeSubmission } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", protect, analyzeSubmission);

export default router;
