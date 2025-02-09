import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Container, Card, Row, Col, Form } from "react-bootstrap";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`${URL}/api/blogs`);
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center">Blog</h2>
      <Form.Control
        type="text"
        placeholder="Search Blog..."
        className="mb-3"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Row>
        {posts
          .filter((post) =>
            post.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((post) => (
            <Col md={6} lg={4} key={post._id} className="mb-4">
              <Card className="shadow-sm">
                {post.imageUrl && (
                  <Card.Img variant="top" src={post.imageUrl} alt="Blog Post" />
                )}
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.content.substring(0, 100)}...</Card.Text>
                  <small className="text-muted">
                    By {post.author} | Tags: {post.tags.join(", ")}
                  </small>
                  {post.videoUrl && (
                    <video src={post.videoUrl} className="w-100 mt-2" controls />
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Blog;
