import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Card, ListGroup } from "react-bootstrap";
import Tilt from "react-parallax-tilt";

const Teaching = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("/api/teaching");
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="teaching-page">
      <h2 className="text-center mb-4 title">Teaching Experience</h2>
      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="">
            <Tilt className="card shadow-lg p-3 rounded glass-card">
              <Card.Body>
                <Card.Title className="text-dark">{course.institution}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">{course.position}</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</ListGroup.Item>
                  <ListGroup.Item><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</ListGroup.Item>
                  <ListGroup.Item><strong>Description:</strong> {course.description}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Tilt>
          </div>
        ))}
      </div>

      <style>
        {`
          .teaching-page {
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
        `}
      </style>
    </div>
  );
};

export default Teaching;
