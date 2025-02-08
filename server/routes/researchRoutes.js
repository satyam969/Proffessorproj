const express = require("express");
const { getResearchPapers, getResearchById, createResearch, updateResearch, deleteResearch } = require("../controllers/researchController");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/", getResearchPapers);
router.get("/:id", getResearchById);
router.post("/", protect, admin, createResearch);
router.put("/:id", protect, admin, updateResearch);
router.delete("/:id", protect, admin, deleteResearch);

module.exports = router;
