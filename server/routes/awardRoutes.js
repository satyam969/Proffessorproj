const express = require("express");
const { getAwards, getAwardById, createAward, updateAward, deleteAward } = require("../controllers/awardController");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/", getAwards);
router.get("/:id", getAwardById);
router.post("/", protect, admin, createAward);
router.put("/:id", protect, admin, updateAward);
router.delete("/:id", protect, admin, deleteAward);

module.exports = router;
