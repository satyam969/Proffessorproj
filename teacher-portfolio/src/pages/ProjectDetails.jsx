import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../utils/axios";

const ProjectDetails = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [replyText, setReplyText] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await axios.get(`/api/projects/${id}`);
                setProject(res.data);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };

        const fetchComments = async () => {
            try {
                const res = await axios.get(`/api/comments/${id}`);
                setComments(res.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchProject();
        fetchComments();
    }, [id]);

    const handleCommentSubmit = async () => {
        if (!commentText) return;
        try {
            const res = await axios.post("/api/comments/add", {
                projectId: id,
                user: "Anonymous",
                text: commentText
            });
            setComments([res.data, ...comments]);
            setCommentText("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    const handleReplySubmit = async (commentId) => {
        if (!replyText) return;
        try {
            const res = await axios.post("/api/comments/reply", {
                commentId,
                user: "Anonymous",
                text: replyText
            });
            setComments(comments.map(comment => 
                comment._id === commentId ? res.data : comment
            ));
            setReplyingTo(null);
            setReplyText("");
        } catch (error) {
            console.error("Error adding reply:", error);
        }
    };

    if (!project) return <p className="text-center mt-5">Loading...</p>;

    return (
        <div className="projects-page">
            <div className="container mt-5 p-4 ">
                <h2 className="text-black text-center">{project.title}</h2>
                <p className="lead text-center text-muted">{project.description}</p>
                <p className="text-center"><strong>Technologies:</strong> {project.technologies.join(", ")}</p>
                <div className="d-flex justify-content-center gap-3 my-3">
                    {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-dark">GitHub</a>}
                    {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Live Demo</a>}
                </div>
                <div className="text-center">
                    {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="img-fluid rounded shadow-lg mb-3" style={{ maxWidth: "80%" }} />}
                    {project.videoUrl && <video src={project.videoUrl} controls className="w-100 rounded shadow-lg" style={{ maxWidth: "80%" }} />}
                </div>
                <h4 className="mt-5">Comments</h4>
                <div className="mb-4 p-3 border rounded bg-white">
                    <textarea 
                        className="form-control" 
                        placeholder="Write a comment..." 
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button className="btn btn-primary mt-2 w-100" onClick={handleCommentSubmit}>Comment</button>
                </div>
                {comments.map(comment => (
                    <div key={comment._id} className="mb-3 p-3 border rounded bg-white">
                        <p className="fw-bold mb-1">{comment.user}</p>
                        <p>{comment.text}</p>
                        <button className="btn btn-link btn-sm text-primary" onClick={() => setReplyingTo(comment._id)}>Reply</button>
                        {replyingTo === comment._id && (
                            <div className="mt-2">
                                <textarea 
                                    className="form-control" 
                                    placeholder="Write a reply..." 
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                />
                                <button className="btn btn-success mt-2 w-100" onClick={() => handleReplySubmit(comment._id)}>Reply</button>
                            </div>
                        )}
                        {comment.replies.length > 0 && (
                            <div className="ms-4 mt-2 border-start ps-3">
                                {comment.replies.map((reply, index) => (
                                    <p key={index} className="text-muted"><strong>{reply.user}</strong>: {reply.text}</p>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectDetails;