import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Card, Container, Row, Col } from "react-bootstrap";
import { FaTrophy } from "react-icons/fa";

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await axios.get(`${URL}/api/achievements`);
        setAchievements(res.data);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      }
    };
    fetchAchievements();
  }, []);

  return (
    <div className="achievements-page">
      <Container className="mt-5">
        <h2 className="text-center mb-4 title">Achievements</h2>
        <Row className="g-4">
          {achievements.length === 0 ? (
            <p className="text-center">No achievements available.</p>
          ) : (
            achievements.map((ach) => (
              <Col key={ach._id} xs={12} sm={6} md={4} lg={3}>
                <Card className="shadow-sm glass-card">
                  {ach.imageUrl && (
                    <Card.Img
                      variant="top"
                      src={ach.imageUrl}
                      alt={ach.title}
                      className="achievement-image"
                    />
                  )}
                  <Card.Body>
                    <div className="d-flex align-items-center mb-2">
                      <FaTrophy className="text-warning me-2" size={24} />
                      <Card.Title className="mb-0">{ach.title}</Card.Title>
                    </div>
                    <Card.Text>
                      <strong>Description:</strong> {ach.description} <br />
                      <strong>Date:</strong>{" "}
                      {ach.date ? new Date(ach.date).toLocaleDateString() : "N/A"}{" "}
                      <br />
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>
      
      <style>
        {`
          .achievements-page {
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
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
          }

          .glass-card:hover {
            transform: translateY(-10px);
          }

          .achievement-image {
            height: 200px;
            object-fit: cover;
          }

          .title {
            font-weight: 600;
            font-size: 2rem;
          }
        `}
      </style>
    </div>
  );
};

export default Achievements;
