const Research = require("../models/Research");
const cloudinary = require("../config/cloudinary");

const createResearch = async (req, res) => {
    const { title, abstract, authors, publicationDate } = req.body;

    try {
        let pdfUrl = "";

        if (req.files?.pdf) {
            const pdfResult = await cloudinary.uploader.upload(req.files.pdf.tempFilePath, {
                folder: "research",
                resource_type: "raw",
            });
            pdfUrl = pdfResult.secure_url;
        }

        const research = await Research.create({
            title,
            abstract,
            authors,
            publicationDate,
            pdfUrl,
        });

        res.status(201).json(research);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getResearchPapers = async (req, res) => {
    try {
        const researchPapers = await Research.find();
        res.json(researchPapers);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getResearchById = async (req, res) => {
    try {
        const research = await Research.findById(req.params.id);
        if (!research) return res.status(404).json({ message: "Research paper not found" });

        res.json(research);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateResearch = async (req, res) => {
    try {
        const research = await Research.findById(req.params.id);
        if (!research) return res.status(404).json({ message: "Research paper not found" });

        const { title, abstract, authors, publicationDate } = req.body;

        let pdfUrl = research.pdfUrl;

        if (req.files?.pdf) {
            const pdfResult = await cloudinary.uploader.upload(req.files.pdf.tempFilePath, {
                folder: "research",
                resource_type: "raw",
            });
            pdfUrl = pdfResult.secure_url;
        }

        research.title = title || research.title;
        research.abstract = abstract || research.abstract;
        research.authors = authors || research.authors;
        research.publicationDate = publicationDate || research.publicationDate;
        research.pdfUrl = pdfUrl;

        await research.save();
        res.json(research);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteResearch = async (req, res) => {
    try {
        const research = await Research.findById(req.params.id);
        if (!research) return res.status(404).json({ message: "Research paper not found" });

        await research.deleteOne();
        res.json({ message: "Research paper deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createResearch, getResearchPapers, getResearchById, updateResearch, deleteResearch };
