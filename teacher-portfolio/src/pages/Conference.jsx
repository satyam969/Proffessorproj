import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Badge } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
const URL=import.meta.env.VITE_URL;
const API_URL = `${URL}/api/conferences`;

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
        <div className="conference-page">
            <h2 className="text-center mb-4 title">Conferences</h2>
            <Row>
                {conferences.map((conference) => (
                    <Col key={conference._id} md={6} lg={4} className="mb-4">
                        <Tilt className="card shadow-lg p-3 rounded glass-card">
                            {conference.imageUrl && (
                                <Card.Img variant="top" src={conference.imageUrl} alt="Conference" />
                            )}
                            <Card.Body>
                                <Card.Title className="text-dark">{conference.title}</Card.Title>
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
                        </Tilt>
                    </Col>
                ))}
            </Row>
            
            <style>
                {`
                    .conference-page {
                        min-height: 100vh;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(270deg, #ff9a9e, #fad0c4, #fad0c4, #ffdde1);
                        background-size: 400% 400%;
                        animation: gradientBG 10s ease infinite;
                        padding-bottom: 50px;
                    }

                    @keyframes gradientBG {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }

                    .glass-card {
                        background: rgba(255, 255, 255, 0.2);
                        backdrop-filter: blur(10px);
                        border-radius: 15px;
                        padding: 20px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                        border: none;
                        margin: 10px;
                    }

                    .title {
                        color: #fff;
                        font-family: 'Roboto', sans-serif;
                        font-size: 2.5rem;
                        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
                    }

                    .card-title {
                        font-size: 1.5rem;
                    }

                    .card-subtitle {
                        font-size: 1.1rem;
                    }

                    .card:hover {
                        transform: translateY(-10px);
                        transition: transform 0.3s ease;
                    }

                    .badge {
                        font-size: 1rem;
                        padding: 0.3rem 0.6rem;
                    }
                `}
            </style>
        </div>
    );
};

export default ConferencePage;
