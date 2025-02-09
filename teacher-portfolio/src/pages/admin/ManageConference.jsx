import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";

const API_URL = "http://localhost:5000/api/conferences";

const ManageConference = () => {
    const [conferences, setConferences] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        date: "",
        location: "",
        image: null,
        video: null,
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchConferences();
    }, []);

    const fetchConferences = async () => {
        try {
            const response = await axios.get(API_URL);
            setConferences(response.data);
        } catch (error) {
            console.error("Error fetching conferences:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("date", formData.date);
        data.append("location", formData.location);
        if (formData.image) data.append("image", formData.image);
        if (formData.video) data.append("video", formData.video);

        try {
            if (editId) {
                await axios.put(`${API_URL}/${editId}`, data);
            } else {
                await axios.post(API_URL, data);
            }
            fetchConferences();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving conference:", error);
        }
    };

    const handleEdit = (conference) => {
        setEditId(conference._id);
        setFormData({
            title: conference.title,
            description: conference.description,
            date: conference.date,
            location: conference.location,
            image: null,
            video: null,
        });
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this conference?")) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchConferences();
            } catch (error) {
                console.error("Error deleting conference:", error);
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditId(null);
        setFormData({ title: "", description: "", date: "", location: "", image: null, video: null });
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center">Manage Conferences</h2>
            <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
                Add Conference
            </Button>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Image</th>
                        <th>Video</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {conferences.map((conference) => (
                        <tr key={conference._id}>
                            <td>{conference.title}</td>
                            <td>{conference.description}</td>
                            <td>{new Date(conference.date).toLocaleDateString()}</td>
                            <td>{conference.location}</td>
                            <td>
                                {conference.imageUrl && (
                                    <img src={conference.imageUrl} alt="Conference" width="100" height="60" />
                                )}
                            </td>
                            <td>
                                {conference.videoUrl && (
                                    <a href={conference.videoUrl} target="_blank" rel="noopener noreferrer">
                                        View Video
                                    </a>
                                )}
                            </td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => handleEdit(conference)}>
                                    Edit
                                </Button>
                                <Button variant="danger" onClick={() => handleDelete(conference._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{editId ? "Edit Conference" : "Add Conference"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" name="image" onChange={handleFileChange} />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            {editId ? "Update" : "Create"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManageConference;
