import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Projects from "./pages/Projects";
import Research from "./pages/Research";
import Achievements from "./pages/Achievement";
import Blog from "./pages/Blog";
import Teaching from "./pages/Teaching";
import Awards from "./pages/Awards";
import About from "./pages/About";

import AdminPanel from "./pages/admin/AdminPanel";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageResearch from "./pages/admin/ManageResearch";
import ManageAchievements from "./pages/admin/ManageAchievements";
import ManageBlog from "./pages/admin/ManageBlogPost";
import ManageTeaching from "./pages/admin/ManageTeaching";
import ManageAwards from "./pages/admin/ManageAward";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageCollaboration from "./pages/admin/ManageCollaboration";
import Conference from "./pages/Conference";
import ManageConference from "./pages/admin/ManageConference";
import ProjectsDetails from "./pages/ProjectDetails";

function App() {
  return (
 
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<ProjectsDetails />} />
        <Route path="/research" element={<Research />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/teaching" element={<Teaching />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="conference" element={<Conference />} />
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="projects" element={<ManageProjects />} />
          <Route path="research" element={<ManageResearch />} />
          <Route path="collaboration" element={<ManageCollaboration />} />
          <Route path="achievements" element={<ManageAchievements />} />
          <Route path="blog" element={<ManageBlog />} />
          <Route path="teaching" element={<ManageTeaching />} />
          <Route path="awards" element={<ManageAwards />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="conference" element={<ManageConference/>} />
        </Route>
      </Routes>
   
  );
}

export default App;
