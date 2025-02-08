const BlogPost = require("../models/BlogPost");
const cloudinary = require("../config/cloudinary");

const createBlogPost = async (req, res) => {
    const { title, content, author, tags } = req.body;

    try {
        let imageUrl = "";
        let videoUrl = "";

        if (req.files?.image) {
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "blogs",
            });
            imageUrl = imageResult.secure_url;
        }

        if (req.files?.video) {
            const videoResult = await cloudinary.uploader.upload(req.files.video.tempFilePath, {
                folder: "blogs",
                resource_type: "video",
            });
            videoUrl = videoResult.secure_url;
        }

        const blogPost = await BlogPost.create({
            title,
            content,
            author,
            tags,
            imageUrl,
            videoUrl,
        });

        res.status(201).json(blogPost);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

const getBlogPosts = async (req, res) => {
    try {
        const blogPosts = await BlogPost.find();
        res.json(blogPosts);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const getBlogPostById = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) return res.status(404).json({ message: "Blog post not found" });

        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const updateBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) return res.status(404).json({ message: "Blog post not found" });

        const { title, content, author, tags } = req.body;

        let imageUrl = blogPost.imageUrl;
        let videoUrl = blogPost.videoUrl;

        if (req.files?.image) {
            const imageResult = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
                folder: "blogs",
            });
            imageUrl = imageResult.secure_url;
        }

        if (req.files?.video) {
            const videoResult = await cloudinary.uploader.upload(req.files.video.tempFilePath, {
                folder: "blogs",
                resource_type: "video",
            });
            videoUrl = videoResult.secure_url;
        }

        blogPost.title = title || blogPost.title;
        blogPost.content = content || blogPost.content;
        blogPost.author = author || blogPost.author;
        blogPost.tags = tags || blogPost.tags;
        blogPost.imageUrl = imageUrl;
        blogPost.videoUrl = videoUrl;

        await blogPost.save();
        res.json(blogPost);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

const deleteBlogPost = async (req, res) => {
    try {
        const blogPost = await BlogPost.findById(req.params.id);
        if (!blogPost) return res.status(404).json({ message: "Blog post not found" });

        await blogPost.deleteOne();
        res.json({ message: "Blog post deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { createBlogPost, getBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost };
