import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";

const ManageBlogPost = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "",
        tags: "",
        image: null,
        video: null
    });

    const URL = import.meta.env.VITE_URL;

    useEffect(() => {
        fetchBlogPosts();
    }, []);

    const fetchBlogPosts = async () => {
        try {
            const response = await axios.get(`${URL}/api/blogs`);
            setBlogPosts(response.data);
        } catch (error) {
            console.error("Error fetching blog posts:", error);
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
        data.append("title", formData.title);
        data.append("content", formData.content);
        data.append("author", formData.author);
        data.append("tags", formData.tags);
        if (formData.image) data.append("image", formData.image);
        if (formData.video) data.append("video", formData.video);

        try {
            await axios.post(`${URL}/api/blogs`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            fetchBlogPosts();
            setFormData({ title: "", content: "", author: "", tags: "", image: null, video: null });
        } catch (error) {
            console.error("Error creating blog post:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${URL}/api/blogs/${id}`);
            fetchBlogPosts();
        } catch (error) {
            console.error("Error deleting blog post:", error);
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Manage Blog Posts</h2>
            <Form onSubmit={handleSubmit} className="p-4 shadow-sm bg-light rounded">
                <Row className="mb-3">
                    <Col>
                        <Form.Control type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Control as="textarea" name="content" placeholder="Content" value={formData.content} onChange={handleChange} required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Control type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
                    </Col>
                    <Col>
                        <Form.Control type="text" name="tags" placeholder="Tags (comma-separated)" value={formData.tags} onChange={handleChange} />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col>
                        <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
                    </Col>
                    <Col>
                        <Form.Control type="file" name="video" accept="video/*" onChange={handleChange} />
                    </Col>
                </Row>
                <Button variant="primary" type="submit" className="w-100">Create Blog Post</Button>
            </Form>

            <h3 className="text-center mt-4">Existing Blog Posts</h3>
            <Row>
                {blogPosts.map((post) => (
                    <Col md={6} lg={4} key={post._id} className="mb-4">
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.content}</Card.Text>
                                <small className="text-muted">By {post.author} | Tags: {post.tags}</small>
                                {post.imageUrl && <Card.Img variant="top" src={post.imageUrl} alt="Blog Post" className="mt-2" />}
                                {post.videoUrl && <video src={post.videoUrl} className="w-100 mt-2" controls />}
                                <Button variant="danger" className="mt-2 w-100" onClick={() => handleDelete(post._id)}>Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ManageBlogPost;
