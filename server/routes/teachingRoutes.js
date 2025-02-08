const express = require("express");
const { getTeachings, getTeachingById, createTeaching, updateTeaching, deleteTeaching } = require("../controllers/teachingController");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.get("/", getTeachings);
router.get("/:id", getTeachingById);
router.post("/", protect, admin, createTeaching);
router.put("/:id", protect, admin, updateTeaching);
router.delete("/:id", protect, admin, deleteTeaching);

module.exports = router;
