import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Button, Container, Table, Card } from "react-bootstrap";

const ManageAward = () => {
  const [awards, setAwards] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    date: "",
    image: null,
  });
  const [editingAward, setEditingAward] = useState(null);

  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const res = await axios.get(`${URL}/api/awards`);
      setAwards(res.data);
    } catch (error) {
      console.error("Error fetching awards", error);
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
      if (editingAward) {
        await axios.put(`${URL}/api/awards/${editingAward._id}`, data);
      } else {
        await axios.post(`${URL}/api/awards`, data);
      }
      setFormData({ title: "", organization: "", date: "", image: null });
      setEditingAward(null);
      fetchAwards();
    } catch (error) {
      console.error("Error saving award", error);
    }
  };

  const handleEdit = (award) => {
    setEditingAward(award);
    setFormData({
      title: award.title,
      organization: award.organization,
      date: award.date,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this award?")) {
      try {
        await axios.delete(`${URL}/api/awards/${id}`);
        fetchAwards();
      } catch (error) {
        console.error("Error deleting award", error);
      }
    }
  };

  return (
    <Container className="my-4">
      <h2 className="text-center">Manage Awards</h2>
      <Card className="p-3 mb-4">
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" value={formData.title} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Organization</Form.Label>
            <Form.Control type="text" name="organization" value={formData.organization} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" onChange={handleChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            {editingAward ? "Update" : "Add"} Award
          </Button>
        </Form>
      </Card>

      <h3 className="text-center">Existing Awards</h3>
      {awards.length === 0 ? (
        <p className="text-center">No awards found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Title</th>
              <th>Organization</th>
              <th>Date</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {awards.map((award) => (
              <tr key={award._id}>
                <td>{award.title}</td>
                <td>{award.organization}</td>
                <td>{new Date(award.date).toLocaleDateString()}</td>
                <td>
                {award.imageUrl && <img src={award.imageUrl} alt="Award" style={{ width: "150px", height: "auto", borderRadius: "8px" }} />}

                </td>
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(award)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(award._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ManageAward;
