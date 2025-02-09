const express = require("express");
const { addComment, addReply, getComments, deleteComment, deleteReply } = require("../controllers/commentcontroller");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/add", addComment);
router.post("/reply", addReply);
router.get("/:projectId", getComments);
router.delete("/:commentId",protect,admin, deleteComment);
router.post("/reply/delete",protect,admin, deleteReply);

module.exports = router;
