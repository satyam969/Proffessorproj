import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Card, ListGroup } from "react-bootstrap";

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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Teaching Experience</h2>
      <div className="row">
        {courses.map((course) => (
          <div key={course._id} className="col-md-6 mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{course.institution}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{course.position}</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</ListGroup.Item>
                  <ListGroup.Item><strong>End Date:</strong> {new Date(course.endDate).toLocaleDateString()}</ListGroup.Item>
                  <ListGroup.Item><strong>Description:</strong> {course.description}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teaching;
