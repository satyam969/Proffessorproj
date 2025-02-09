const express = require("express");
const router = express.Router();
const { getConferences, createConference, deleteConference, updateConference } = require("../controllers/conferenceController");
const { protect, admin } = require("../middleware/AuthMiddleware.js");

router.get("/", getConferences);
router.post("/",protect,admin, createConference);
router.delete("/:id",protect,admin, deleteConference);
router.put("/:id",protect,admin, updateConference);

module.exports = router;
