import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Table, Card, Modal, Container, Row, Col } from "react-bootstrap";

const ManageAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    image: null,
  });
  const [editingAchievement, setEditingAchievement] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const res = await axios.get(`${URL}/api/achievements`);
      setAchievements(res.data);
    } catch (error) {
      console.error("Error fetching achievements", error);
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
      if (editingAchievement) {
        await axios.put(`${URL}/api/achievements/${editingAchievement._id}`, data);
      } else {
        await axios.post(`${URL}/api/achievements`, data);
      }
      setFormData({ title: "", description: "", date: "", image: null });
      setEditingAchievement(null);
      fetchAchievements();
    } catch (error) {
      console.error("Error saving achievement", error);
    }
  };

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement);
    setFormData({
      title: achievement.title,
      description: achievement.description,
      date: achievement.date,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this achievement?")) {
      try {
        await axios.delete(`${URL}/api/achievements/${id}`);
        fetchAchievements();
      } catch (error) {
        console.error("Error deleting achievement", error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">🎖️ Manage Achievements</h2>

     
      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required rows={3} />
          </Form.Group>

          <Form.Group controlId="image" className="mb-3">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} />
          </Form.Group>

          <Button variant={editingAchievement ? "warning" : "primary"} type="submit">
            {editingAchievement ? "Update" : "Add"} Achievement
          </Button>
        </Form>
      </Card>

     
      <h3 className="mt-5 mb-3">🏆 Achievement List</h3>
      {achievements.length === 0 ? (
        <p className="text-muted text-center">No achievements found.</p>
      ) : (
        <Row className="g-4">
          {achievements.map((achievement) => (
            <Col md={4} key={achievement._id}>
              <Card className="shadow-sm h-100">
                {achievement.imageUrl && (
                  <Card.Img
                    variant="top"
                    src={achievement.imageUrl}
                    alt="Achievement"
                    className="achievement-image"
                    onClick={() => {
                      setSelectedImage(achievement.imageUrl);
                      setShowModal(true);
                    }}
                  />
                )}
                <Card.Body>
                  <Card.Title>{achievement.title}</Card.Title>
                  <Card.Text>{achievement.description}</Card.Text>
                  <p className="text-muted">
                    <strong>Date:</strong> {new Date(achievement.date).toLocaleDateString()}
                  </p>
                  <div className="d-flex justify-content-between">
                    <Button variant="success" onClick={() => handleEdit(achievement)}>
                      ✏️ Edit
                    </Button>
                    <Button variant="danger" onClick={() => handleDelete(achievement._id)}>
                      🗑️ Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

    
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Achievement Image</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <img src={selectedImage} alt="Achievement" className="img-fluid" />
        </Modal.Body>
      </Modal>

      
      <style>{`
        .achievement-image {
          height: 200px;
          object-fit: cover;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .achievement-image:hover {
          transform: scale(1.05);
        }
      `}</style>
    </Container>
  );
};

export default ManageAchievements;
