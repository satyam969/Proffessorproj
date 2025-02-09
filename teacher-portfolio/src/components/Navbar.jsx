import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/userContext";
import { toast } from "react-toastify";

const NavigationBar = () => {
  const navigate=useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("auth");
    toast.success("Logged out successfully!");
    navigate("/login");
  };
  const {auth}=useAuth();
  return (
    <Navbar
    expand="lg"
    style={{
      backgroundColor: "transparent",
     
    }}
  >
    <Container>
      <Navbar.Brand
        as={Link}
        to="/"
        style={{ color: "black", fontWeight: "bold" }}
      >
        Prof. Portfolio
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" style={{ color: "black" }}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/projects" style={{ color: "black" }}>
            Projects
          </Nav.Link>
          <Nav.Link as={Link} to="/research" style={{ color: "black" }}>
            Research
          </Nav.Link>
          <Nav.Link as={Link} to="/conference" style={{ color: "black" }}>
            Conferences
          </Nav.Link>
          <Nav.Link as={Link} to="/achievements" style={{ color: "black" }}>
            Achievements
          </Nav.Link>
          <Nav.Link as={Link} to="/teaching" style={{ color: "black" }}>
            Teaching
          </Nav.Link>
          <Nav.Link as={Link} to="/awards" style={{ color: "black" }}>
            Awards
          </Nav.Link>
          <Nav.Link as={Link} to="/blog" style={{ color: "black" }}>
            Blog
          </Nav.Link>
          {auth && auth.role==="admin" &&<Nav.Link as={Link} to="/admin" style={{ color: "black" }}>
            Admin Panel
          </Nav.Link>}
          {auth ?<Button onClick={()=>{
            handleLogout();
          }}>
            Logout
          </Button>: <Nav.Link as={Link} to="/Login" style={{ color: "black" }}>
            LogIn          </Nav.Link>}
          
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
};

export default NavigationBar;
