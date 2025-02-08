import { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveDemo: "",
    });
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [previewVideo, setPreviewVideo] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setPreviewImage(URL.createObjectURL(e.target.files[0]));
    };

    const handleVideoChange = (e) => {
        setVideo(e.target.files[0]);
        setPreviewVideo(URL.createObjectURL(e.target.files[0])); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("technologies", formData.technologies);
        data.append("githubLink", formData.githubLink);
        data.append("liveDemo", formData.liveDemo);
        if (image) data.append("image", image);
        if (video) data.append("video", video);

        console.log(data);

        try {
            const response = await axios.post("http://localhost:5000/api/projects", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            

            console.log(response);

            const result = await response.json();
            if (response.ok) {
                setMessage("Project created successfully!");
                setFormData({
                    title: "",
                    description: "",
                    technologies: "",
                    githubLink: "",
                    liveDemo: "",
                });
                setImage(null);
                setVideo(null);
                setPreviewImage(null);
                setPreviewVideo(null);
            } else {
                setMessage(result.message || "Failed to create project");
            }
        } catch (error) {
            setMessage("Server error. Try again.");
        }
    };

    return (
        <div>
            <h2>Create Project</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="text" name="technologies" placeholder="Technologies" value={formData.technologies} onChange={handleChange} required />
                <input type="text" name="githubLink" placeholder="GitHub Link" value={formData.githubLink} onChange={handleChange} />
                <input type="text" name="liveDemo" placeholder="Live Demo" value={formData.liveDemo} onChange={handleChange} />

                <label>Upload Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {previewImage && <img src={previewImage} alt="Preview" width="100" />}

                <label>Upload Video:</label>
                <input type="file" accept="video/*" onChange={handleVideoChange} />
                {previewVideo && <video src={previewVideo} controls width="200" />}

                <button type="submit">Create Project</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProjectForm;
