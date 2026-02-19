import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createSubmission,
  getAllSubmissions,
  getSubmissionById,
  deleteSubmission
} from "../controllers/submissionController.js";

const router = express.Router();

router.post("/create", protect, createSubmission);
router.get("/", protect, getAllSubmissions);
router.get("/:id", protect, getSubmissionById);
router.delete("/:id", protect, deleteSubmission);

export default router;
