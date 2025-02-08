const express = require("express");
const { getCollaborations, getCollaborationById, createCollaboration, updateCollaboration, deleteCollaboration } = require("../controllers/collaborationController");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/", getCollaborations);
router.get("/:id", getCollaborationById);
router.post("/", protect, admin, createCollaboration);
router.put("/:id", protect, admin, updateCollaboration);
router.delete("/:id", protect, admin, deleteCollaboration);

module.exports = router;
