const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

const createProject = async (req, res) => {
    const { title, description, technologies, githubLink, liveDemo } = req.body;
    try {
        let imageUrl = "";
        let videoUrl = "";

        if (req.files?.image) {
            console.log("image found ")
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "projects",
                resource_type: "image",
            });
            imageUrl = imageResult.secure_url;
        }

        if (req.files?.video) {
            console.log("video found ")
            const videoResult = await cloudinary.uploader.upload(req.files.video.tempFilePath, {
                folder: "projects",
                resource_type: "video",
            });
            videoUrl = videoResult.secure_url;
        }

        const project = await Project.create({
            title,
            description,
            technologies,
            imageUrl,
            videoUrl,
            githubLink,
            liveDemo,
        });

        res.status(201).json(project);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};




const updateProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        const { title, description, technologies, githubLink, liveDemo } = req.body;

        let imageUrl = project.imageUrl;
        let videoUrl = project.videoUrl;

        if (req.files?.image) {
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "projects",
                resource_type: "image",
            });
            imageUrl = imageResult.secure_url;
        }

        if (req.files?.video) {
            const videoResult = await cloudinary.uploader.upload(req.files.video.tempFilePath, {
                folder: "projects",
                resource_type: "video",
            });
            videoUrl = videoResult.secure_url;
        }

        project.title = title || project.title;
        project.description = description || project.description;
        project.technologies = technologies || project.technologies;
        project.githubLink = githubLink || project.githubLink;
        project.liveDemo = liveDemo || project.liveDemo;
        project.imageUrl = imageUrl;
        project.videoUrl = videoUrl;

        await project.save();
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: "Project not found" });

        await project.deleteOne();
        res.json({ message: "Project deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createProject, getProjects, getProjectById, updateProject, deleteProject };
