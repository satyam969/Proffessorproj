import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Modal, Container, Row, Col } from "react-bootstrap";

const ManageResearch = () => {
    const [researchPapers, setResearchPapers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedResearch, setSelectedResearch] = useState(null);
    const [formData, setFormData] = useState({ title: "", abstract: "", authors: "", publicationDate: "", pdf: null });

    useEffect(() => {
        fetchResearchPapers();
    }, []);

    const URL = import.meta.env.VITE_URL;

    const fetchResearchPapers = async () => {
        try {
            const { data } = await axios.get(`${URL}/api/research`);
            setResearchPapers(data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            if (window.confirm("Are you sure you want to delete this research paper?")) {
                await axios.delete(`${URL}/api/research/${id}`);
                fetchResearchPapers();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleEdit = (research) => {
        setSelectedResearch(research);
        setFormData({ title: research.title, abstract: research.abstract, authors: research.authors, publicationDate: research.publicationDate });
        setShowModal(true);
    };

    const handleSave = async () => {
        try {
            const formDataObj = new FormData();
            formDataObj.append("title", formData.title);
            formDataObj.append("abstract", formData.abstract);
            formDataObj.append("authors", formData.authors);
            formDataObj.append("publicationDate", formData.publicationDate);
            if (formData.pdf) formDataObj.append("pdf", formData.pdf);

            if (selectedResearch) {
                await axios.put(`${URL}/api/research/${selectedResearch._id}`, formDataObj);
            } else {
                await axios.post(`${URL}/api/research`, formDataObj);
            }

            setShowModal(false);
            fetchResearchPapers();
        } catch (error) {
            console.error("Error saving research paper:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center">Manage Research Papers</h2>

            <Row className="mb-3">
                <Col xs={12} md={6} className="mb-2">
                    <Form.Control type="text" placeholder="Search Research..." onChange={(e) => setSearchTerm(e.target.value)} />
                </Col>
                <Col xs={12} md={6} className="text-md-end">
                    <Button onClick={() => { setSelectedResearch(null); setShowModal(true); }}>Add Research</Button>
                </Col>
            </Row>

            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Authors</th>
                            <th>Publication Date</th>
                            <th>PDF</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {researchPapers?.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase())).map((research) => (
                            <tr key={research._id}>
                                <td>{research.title}</td>
                                <td>{research.authors}</td>
                                <td>{research.publicationDate}</td>
                                <td>
                                    {research.pdfUrl ? (
                                        <a href={research.pdfUrl} target="_blank" rel="noopener noreferrer">
                                            View PDF
                                        </a>
                                    ) : (
                                        "No PDF Available"
                                    )}
                                </td>
                                <td>
                                    <Button variant="info" size="sm" onClick={() => handleEdit(research)}>Edit</Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(research._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedResearch ? "Edit Research" : "Add Research"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Abstract</Form.Label>
                            <Form.Control as="textarea" rows={3} value={formData.abstract} onChange={(e) => setFormData({ ...formData, abstract: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Authors</Form.Label>
                            <Form.Control type="text" value={formData.authors} onChange={(e) => setFormData({ ...formData, authors: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Publication Date</Form.Label>
                            <Form.Control type="date" value={formData.publicationDate} onChange={(e) => setFormData({ ...formData, publicationDate: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Upload PDF</Form.Label>
                            <Form.Control type="file" onChange={(e) => setFormData({ ...formData, pdf: e.target.files[0] })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ManageResearch;
