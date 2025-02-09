const express = require("express");
const router = express.Router();
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require("../controllers/projectcontroller");
const { protect, admin } = require("../middleware/AuthMiddleware");

router.route("/").post( protect,admin,createProject).get(getProjects);
router.route("/:id").get(getProjectById).put(protect,admin, updateProject).delete(protect,admin, deleteProject);

module.exports = router;
