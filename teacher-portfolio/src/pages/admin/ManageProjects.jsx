import { useEffect, useState } from "react";
import axios from "axios";

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    liveDemo: "",
    image: null,
    video: null,
  });
  const [editingProject, setEditingProject] = useState(null);
  const URL=import.meta.env.VITE_URL;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${URL}/api/projects`);
      console.log(res);
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      if (editingProject) {
        await axios.put(`${URL}/api/projects/${editingProject._id}`, data);
      } else {
        await axios.post(`${URL}/api/projects`, data);
      }
      setFormData({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        liveDemo: "",
        image: null,
        video: null,
      });
      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project", error);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      githubLink: project.githubLink,
      liveDemo: project.liveDemo,
      image: null,
      video: null,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`${URL}/api/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error("Error deleting project", error);
      }
    }
  };

  return (
    <div className="manage-projects-container">
      <h2>Manage Projects</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="project-form">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="technologies" placeholder="Technologies" value={formData.technologies} onChange={handleChange} required />
        <input type="text" name="githubLink" placeholder="GitHub Link" value={formData.githubLink} onChange={handleChange} />
        <input type="text" name="liveDemo" placeholder="Live Demo Link" value={formData.liveDemo} onChange={handleChange} />
        <input type="file" name="image" onChange={handleChange} />
        <input type="file" name="video" onChange={handleChange} />
        <button type="submit">{editingProject ? "Update" : "Add"} Project</button>
      </form>

      <div className="project-list">
        {projects.length === 0 ? <p>No projects found.</p> : projects?.map((project) => (
          <div key={project._id} className="project-item">
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p><strong>Technologies:</strong> {project.technologies}</p>
            {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>}
            {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live Demo</a>}
            {project.imageUrl && <img src={project.imageUrl} alt="Project" height="60%" width="60%" />}
            {project.videoUrl && <video src={project.videoUrl} controls height="60%" width="60%" />}
            <div className="actions">
              <button onClick={() => handleEdit(project)}>Edit</button>
              <button onClick={() => handleDelete(project._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .manage-projects-container {
          max-width: 800px;
          margin: auto;
          padding: 20px;
          text-align: center;
        }
        .project-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .project-form input, .project-form textarea {
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        .project-form button {
          background-color: #007bff;
          color: white;
          padding: 10px;
          border: none;
          cursor: pointer;
        }
        .project-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .project-item {
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 5px;
          text-align: left;
        }
        .project-item img, .project-item video {
          display: block;
          margin-top: 10px;
        }
        .actions {
          margin-top: 10px;
          display: flex;
          gap: 10px;
        }
        .actions button {
          padding: 5px 10px;
          border: none;
          cursor: pointer;
        }
        .actions button:first-child {
          background-color: #28a745;
          color: white;
        }
        .actions button:last-child {
          background-color: #dc3545;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ManageProjects;
