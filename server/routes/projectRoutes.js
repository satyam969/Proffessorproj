const express = require("express");
const router = express.Router();
const { createProject, getProjects, getProjectById, updateProject, deleteProject } = require("../controllers/projectController");
const { protect } = require("../middleware/AuthMiddleware");

router.route("/").post( createProject).get(getProjects);
router.route("/:id").get(getProjectById).put(protect, updateProject).delete(protect, deleteProject);

module.exports = router;