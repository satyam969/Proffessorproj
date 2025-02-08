const Collaboration = require("../models/Collaboration");

const getCollaborations = async (req, res) => {
    const collaborations = await Collaboration.find({});
    res.json(collaborations);
};

const getCollaborationById = async (req, res) => {
    const collaboration = await Collaboration.findById(req.params.id);

    if (collaboration) {
        res.json(collaboration);
    } else {
        res.status(404).json({ message: "Collaboration not found" });
    }
};

const createCollaboration = async (req, res) => {
    const { institution, projectTitle, startDate, endDate, details } = req.body;

    const collaboration = new Collaboration({ institution, projectTitle, startDate, endDate, details });

    const createdCollaboration = await collaboration.save();
    res.status(201).json(createdCollaboration);
};

const updateCollaboration = async (req, res) => {
    const { institution, projectTitle, startDate, endDate, details } = req.body;
    const collaboration = await Collaboration.findById(req.params.id);

    if (collaboration) {
        collaboration.institution = institution || collaboration.institution;
        collaboration.projectTitle = projectTitle || collaboration.projectTitle;
        collaboration.startDate = startDate || collaboration.startDate;
        collaboration.endDate = endDate || collaboration.endDate;
        collaboration.details = details || collaboration.details;

        const updatedCollaboration = await collaboration.save();
        res.json(updatedCollaboration);
    } else {
        res.status(404).json({ message: "Collaboration not found" });
    }
};

const deleteCollaboration = async (req, res) => {
    const collaboration = await Collaboration.findById(req.params.id);

    if (collaboration) {
        await collaboration.deleteOne();
        res.json({ message: "Collaboration deleted" });
    } else {
        res.status(404).json({ message: "Collaboration not found" });
    }
};

module.exports = { getCollaborations, getCollaborationById, createCollaboration, updateCollaboration, deleteCollaboration };
