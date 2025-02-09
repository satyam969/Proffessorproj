import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/userContext";
import { useEffect } from "react";
import { Container, Row, Col, ListGroup, Spinner } from "react-bootstrap";

const AdminPanel = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === null) return;
    if (!auth || auth.role !== "admin") {
      navigate("/");
    }
  }, [auth, navigate]);

  if (auth === null) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Container fluid>
      <Row>
        {/* Sidebar */}
        <Col md={3} lg={2} className="bg-dark text-white p-3 min-vh-100">
          <h3 className="text-center mb-4">Admin Panel</h3>
          <ListGroup variant="flush">
            <ListGroup.Item action as={Link} to="projects" className="bg-dark text-white">
              Manage Projects
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="research" className="bg-dark text-white">
              Manage Research
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="conference" className="bg-dark text-white">
              Manage Conferences
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="achievements" className="bg-dark text-white">
              Manage Achievements
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="blog" className="bg-dark text-white">
              Manage Blog
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="teaching" className="bg-dark text-white">
              Manage Teaching
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="awards" className="bg-dark text-white">
              Manage Awards
            </ListGroup.Item>
            <ListGroup.Item action as={Link} to="users" className="bg-dark text-white">
              Manage Users
            </ListGroup.Item>
          </ListGroup>
        </Col>

       
        <Col md={9} lg={10} className="p-4">
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;
