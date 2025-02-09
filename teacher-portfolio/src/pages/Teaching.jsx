import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Card, ListGroup } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import NavigationBar from "../components/Navbar";

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
      <NavigationBar />
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

    
    </div>
  );
};

export default Teaching;
