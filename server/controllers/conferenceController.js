const Conference = require("../models/Conference");
const cloudinary = require("../config/cloudinary");

const createConference = async (req, res) => {
    const { title, description, date, location } = req.body;

    try {
        let imageUrl = "";
      

        if (req.files?.image) {
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "conferences",
            });
            imageUrl = imageResult.secure_url;
        }

       

        const conference = await Conference.create({
            title,
            description,
            date,
            location,
            imageUrl,
           
        });

        res.status(201).json(conference);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getConferences = async (req, res) => {
    try {
        const conferences = await Conference.find();
        res.json(conferences);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getConferenceById = async (req, res) => {
    try {
        const conference = await Conference.findById(req.params.id);
        if (!conference) return res.status(404).json({ message: "Conference not found" });

        res.json(conference);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateConference = async (req, res) => {
    try {
        const conference = await Conference.findById(req.params.id);
        if (!conference) return res.status(404).json({ message: "Conference not found" });

        const { title, description, date, location } = req.body;

        let imageUrl = conference.imageUrl;
      

        if (req.files?.image) {
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "conferences",
            });
            imageUrl = imageResult.secure_url;
        }

       

        conference.title = title || conference.title;
        conference.description = description || conference.description;
        conference.date = date || conference.date;
        conference.location = location || conference.location;
        conference.imageUrl = imageUrl;
       

        await conference.save();
        res.json(conference);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteConference = async (req, res) => {
    try {
        const conference = await Conference.findById(req.params.id);
        if (!conference) return res.status(404).json({ message: "Conference not found" });

        await conference.deleteOne();
        res.json({ message: "Conference deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createConference, getConferences, getConferenceById, updateConference, deleteConference };
