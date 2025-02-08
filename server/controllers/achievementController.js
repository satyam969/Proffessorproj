const Achievement = require("../models/Achievement");
const cloudinary = require("../config/cloudinary");

const createAchievement = async (req, res) => {
    const { title, description, date } = req.body;

    try {
        let imageUrl = "";

        if (req.files?.image) {
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "achievements",
            });
            imageUrl = imageResult.secure_url;
        }

        const achievement = await Achievement.create({
            title,
            description,
            date,
            imageUrl,
        });

        res.status(201).json(achievement);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (!achievement) return res.status(404).json({ message: "Achievement not found" });

        res.json(achievement);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (!achievement) return res.status(404).json({ message: "Achievement not found" });

        const { title, description, date } = req.body;

        let imageUrl = achievement.imageUrl;

        if (req.files?.image) {
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "achievements",
            });
            imageUrl = imageResult.secure_url;
        }

        achievement.title = title || achievement.title;
        achievement.description = description || achievement.description;
        achievement.date = date || achievement.date;
        achievement.imageUrl = imageUrl;

        await achievement.save();
        res.json(achievement);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteAchievement = async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);
        if (!achievement) return res.status(404).json({ message: "Achievement not found" });

        await achievement.deleteOne();
        res.json({ message: "Achievement deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createAchievement, getAchievements, getAchievementById, updateAchievement, deleteAchievement };
