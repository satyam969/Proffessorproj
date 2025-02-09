import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Container, Card, Row, Col, Form } from "react-bootstrap";
import NavigationBar from "../components/Navbar";

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
    <div className="blog-page">
      <NavigationBar />
      <Container className="mt-5">
        <h2 className="text-center title">Blog</h2>
        <Form.Control
          type="text"
          placeholder="Search Blog..."
          className="mb-3 search-input"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Row>
          {posts
            .filter((post) =>
              post.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((post) => (
              <Col md={6} lg={4} key={post._id} className="mb-4">
                <Card className="shadow-sm glass-card">
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

      <style>
        {`
          .blog-page {
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

          .title {
            font-weight: 600;
            font-size: 2rem;
          }

          .search-input {
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
          }

          .card-img-top {
            height: 200px;
            object-fit: cover;
          }
        `}
      </style>
    </div>
  );
};

export default Blog;
