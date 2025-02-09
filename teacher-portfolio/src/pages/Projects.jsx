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
              
                <div className="card-body text-center">
                  <h4 className="card-title text-dark">{project.title}</h4>
                  <p className="card-text text-muted"> {project.description.split(" ").slice(0, 30).join(" ")}</p>
                  <p><strong>Technologies:</strong> {project.technologies.join(", ")}</p>
                  {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-dark btn-sm me-2">GitHub</a>}
                  {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Live Demo</a>}
                
                  <a href={`/project/${project._id}`} className="btn btn-info">More Details</a>
                </div>
              </Tilt>
            </div>
          ))
        )}
      </div>

     
    </div>
  );
};

export default Projects;
