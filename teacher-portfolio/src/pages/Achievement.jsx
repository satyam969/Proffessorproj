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
    <Container className="mt-5">
      <h2 className="text-center mb-4"> Achievements</h2>
      <Row className="g-4">
        {achievements.length === 0 ? (
          <p className="text-center">No achievements available.</p>
        ) : (
          achievements.map((ach) => (
            <Col key={ach._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="shadow-sm">
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
  );
};

export default Achievements;
