const Teaching = require("../models/Teaching");

const getTeachings = async (req, res) => {
    const teachings = await Teaching.find({});
    res.json(teachings);
};

const getTeachingById = async (req, res) => {
    const teaching = await Teaching.findById(req.params.id);

    if (teaching) {
        res.json(teaching);
    } else {
        res.status(404).json({ message: "Teaching record not found" });
    }
};

const createTeaching = async (req, res) => {
    const { institution, position, startDate, endDate, description } = req.body;

    const teaching = new Teaching({ institution, position, startDate, endDate, description });

    const createdTeaching = await teaching.save();
    res.status(201).json(createdTeaching);
};

const updateTeaching = async (req, res) => {
    const { institution, position, startDate, endDate, description } = req.body;
    const teaching = await Teaching.findById(req.params.id);

    if (teaching) {
        teaching.institution = institution || teaching.institution;
        teaching.position = position || teaching.position;
        teaching.startDate = startDate || teaching.startDate;
        teaching.endDate = endDate || teaching.endDate;
        teaching.description = description || teaching.description;

        const updatedTeaching = await teaching.save();
        res.json(updatedTeaching);
    } else {
        res.status(404).json({ message: "Teaching record not found" });
    }
};

const deleteTeaching = async (req, res) => {
    const teaching = await Teaching.findById(req.params.id);

    if (teaching) {
        await teaching.deleteOne();
        res.json({ message: "Teaching record deleted" });
    } else {
        res.status(404).json({ message: "Teaching record not found" });
    }
};

module.exports = { getTeachings, getTeachingById, createTeaching, updateTeaching, deleteTeaching };