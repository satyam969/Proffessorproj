const Award = require("../models/Award");
const cloudinary = require("../config/cloudinary");

const createAward = async (req, res) => {
    const { title, organization, date } = req.body;

    try {
        let imageUrl = "";

        if (req.files?.image) {
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "awards",
            });
            imageUrl = imageResult.secure_url;
        }

        const award = await Award.create({
            title,
            organization,
            date,
            imageUrl,
        });

        res.status(201).json(award);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getAwards = async (req, res) => {
    try {
        const awards = await Award.find();
        res.json(awards);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getAwardById = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(404).json({ message: "Award not found" });

        res.json(award);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateAward = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(404).json({ message: "Award not found" });

        const { title, organization, date } = req.body;

        let imageUrl = award.imageUrl;

        if (req.files?.image) {
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "awards",
            });
            imageUrl = imageResult.secure_url;
        }

        award.title = title || award.title;
        award.organization = organization || award.organization;
        award.date = date || award.date;
        award.imageUrl = imageUrl;

        await award.save();
        res.json(award);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteAward = async (req, res) => {
    try {
        const award = await Award.findById(req.params.id);
        if (!award) return res.status(404).json({ message: "Award not found" });

        await award.deleteOne();
        res.json({ message: "Award deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createAward, getAwards, getAwardById, updateAward, deleteAward };
