const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile, getAllUsers, deleteUser } = require("../controllers/usercontroller");
const { protect, admin } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/", protect, admin, getAllUsers);
router.delete("/:id", protect, admin, deleteUser);

module.exports = router;
