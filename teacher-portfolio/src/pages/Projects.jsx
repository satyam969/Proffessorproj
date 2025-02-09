import { useEffect, useState } from "react";
import axios from "../utils/axios";
import Tilt from "react-parallax-tilt";
import NavigationBar from "../components/Navbar";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(search.toLowerCase()) ||
    project.description.toLowerCase().includes(search.toLowerCase()) ||
    project.technologies.some((tech) => tech.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="projects-page">
      <NavigationBar />
      <h2 className="text-center mb-4 title">Projects</h2>
      <input
        type="text"
        placeholder="Search Projects..."
        className="form-control search-input my-3"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filteredProjects.length === 0 ? (
          <p className="text-center text-white">No projects found.</p>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="col-md-6 col-lg-4 mb-4">
              <Tilt className="card shadow-lg p-3 rounded glass-card">
                {project.imageUrl && (
                  <img src={project.imageUrl} className="card-img-top" alt="Project" style={{ maxHeight: "200px", objectFit: "cover" }} />
                )}
                <div className="card-body text-center">
                  <h4 className="card-title text-dark">{project.title}</h4>
                  <p className="card-text text-muted"> {project.description.split(" ").slice(0, 30).join(" ")}</p>
                  <p><strong>Technologies:</strong> {project.technologies.join(", ")}</p>
                  {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm me-2">GitHub</a>}
                  {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live Demo</a>}
                  {project.videoUrl && (
                    <video src={project.videoUrl} controls className="mt-3 w-100 rounded" style={{ maxHeight: "200px" }} />
                  )}
                </div>
              </Tilt>
            </div>
          ))
        )}
      </div>

      <style>
        {`
          .projects-page {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: linear-gradient(270deg, #ff9a9e, #fad0c4, #fad0c4, #ffdde1);
            background-size: 400% 400%;
            animation: gradientBG 10s ease infinite;
            padding-bottom: 50px;
          }

          @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            border: none;
            margin: 10px;
          }

          .title {
            color: #fff;
            font-family: 'Roboto', sans-serif;
            font-size: 2.5rem;
            text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          }

          .search-input {
            max-width: 500px;
            border-radius: 25px;
            padding: 10px;
            font-size: 1.1rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.5);
            color: #333;
            transition: background 0.3s ease;
          }

          .search-input:focus {
            background: rgba(255, 255, 255, 0.8);
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

export default Projects;
