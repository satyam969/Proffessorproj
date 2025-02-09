import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";

const API_URL = "http://localhost:5000/api/conferences";

const ConferencePage = () => {
    const [conferences, setConferences] = useState([]);

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

    const getStatus = (date) => {
        const today = new Date();
        return new Date(date) > today ? "Upcoming" : "Past";
    };

    return (
        <Container className="mt-5">
            <h2 className="text-center mb-4">Conferences</h2>
            <Row>
                {conferences.map((conference) => (
                    <Col key={conference._id} md={6} lg={4} className="mb-4">
                        <Card className="shadow-sm">
                            {conference.imageUrl && (
                                <Card.Img variant="top" src={conference.imageUrl} alt="Conference" />
                            )}
                            <Card.Body>
                                <Card.Title>{conference.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {new Date(conference.date).toLocaleDateString()} - {conference.location}
                                </Card.Subtitle>
                                <Card.Text>{conference.description}</Card.Text>
                                <Badge bg={getStatus(conference.date) === "Upcoming" ? "success" : "secondary"}>
                                    {getStatus(conference.date)}
                                </Badge>
                            </Card.Body>
                            {conference.videoUrl && (
                                <Card.Footer>
                                    <a href={conference.videoUrl} target="_blank" rel="noopener noreferrer">
                                        Watch Video
                                    </a>
                                </Card.Footer>
                            )}
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ConferencePage;
