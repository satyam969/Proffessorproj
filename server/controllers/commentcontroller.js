const Comment = require("../models/Comment");

addComment = async (req, res) => {
    try {
        const { projectId, user, text } = req.body;
        const newComment = new Comment({ projectId, user, text });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: "Failed to add comment" });
    }
};

deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        await Comment.findByIdAndDelete(commentId);
        res.json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
};


addReply = async (req, res) => {
    try {
        const { commentId, user, text } = req.body;
        const comment = await Comment.findById(commentId);
        if (!comment) return res.status(404).json({ error: "Comment not found" });

        comment.replies.push({ user, text });
        await comment.save();

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ error: "Failed to add reply" });
    }
};

getComments = async (req, res) => {
    try {
        const { projectId } = req.params;
        const comments = await Comment.find({ projectId }).sort({ createdAt: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
};

deleteReply = async (req, res) => {
    try {
        const { commentId, replyIndex } = req.body;
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (replyIndex < 0 || replyIndex >= comment.replies.length) {
            return res.status(400).json({ error: "Invalid reply index" });
        }

        comment.replies.splice(replyIndex, 1);
        await comment.save();

        res.json({ message: "Reply deleted successfully", comment });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete reply" });
    }
};


module.exports={getComments,addComment,deleteComment,deleteReply,addReply}