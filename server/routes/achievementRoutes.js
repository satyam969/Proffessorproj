const express = require("express");
const { getAchievements, getAchievementById, createAchievement, updateAchievement, deleteAchievement } = require("../controllers/achievementController");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/", getAchievements);
router.get("/:id", getAchievementById);
router.post("/", protect, admin, createAchievement);
router.put("/:id", protect, admin, updateAchievement);
router.delete("/:id", protect, admin, deleteAchievement);

module.exports = router;
