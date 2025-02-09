import NavigationBar from "../components/Navbar";
import { Card, Container, Row, Col } from "react-bootstrap";
import svg from '../assets/react.svg'

const About = () => {
  return (
    <div className="about-page">
      <NavigationBar />
      <Container className="mt-4">
        <h2 className="text-center mb-4 text-white">About the Professor</h2>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="glass-card text-center">
              <Card.Img
                variant="top"
                src={svg}
                alt="Professor Image"
                className="profile-img"
              />
              <Card.Body>
                <Card.Title className="fw-bold text-black">
                  Prof. Danish B
                </Card.Title>
                <Card.Text className="text-dark">
                  Ph.D. in Computer Science  
                  <br /> AI & Machine Learning Researcher
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={6}>
            <Card className="glass-card">
              <Card.Body>
                <Card.Title className="fw-bold text-black">Biography</Card.Title>
                <Card.Text className="text-dark">
                  Prof. Danish B has over 20 years of experience in academia,
                  specializing in artificial intelligence, deep learning, and
                  data science. His work has been published in top-tier journals.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md={6} lg={6}>
            <Card className="glass-card">
              <Card.Body>
                <Card.Title className="fw-bold text-black">Research Interests</Card.Title>
                <Card.Text className="text-dark">
                  - Artificial Intelligence & Deep Learning
                  <br />- Natural Language Processing
                  <br />- Computer Vision & Image Processing
                  <br />- Big Data Analytics
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} lg={6}>
            <Card className="glass-card">
              <Card.Body>
                <Card.Title className="fw-bold text-black">Achievements</Card.Title>
                <Card.Text className="text-dark">
                  - Published over 50 research papers in reputed journals
                  <br />- Awarded "Best AI Researcher" in 2022
                  <br />- Keynote speaker at various international conferences
                  <br />- Mentored 100+ students in AI and ML projects
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="justify-content-center mt-4">
          <Col md={8}>
            <Card className="glass-card text-center">
              <Card.Body>
                <Card.Title className="fw-bold text-black">Contact Information</Card.Title>
                <Card.Text className="text-dark">
                  <strong>Email:</strong> prof.danish@example.com
                  <br /><strong>LinkedIn:</strong> linkedin.com/in/prof-danish
                  <br /><strong>Website:</strong> www.professor-danish.com
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default About;