import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Card, ListGroup, Button } from "react-bootstrap";

const Research = () => {
  const [papers, setPapers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const res = await axios.get("/api/research");
        setPapers(res.data);
      } catch (error) {
        console.error("Error fetching research papers:", error);
      }
    };
    fetchPapers();
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Research Papers</h2>
      
      <input 
        type="text" 
        placeholder="Search Papers..." 
        className="form-control my-3" 
        onChange={(e) => setSearch(e.target.value)}
      />

      {papers.filter(p => p.title.toLowerCase().includes(search.toLowerCase())).map((paper) => (
        <Card key={paper._id} className="mb-3 shadow-sm">
          <Card.Body>
            <Card.Title>{paper.title}</Card.Title>
            <Card.Subtitle className="text-muted">
              {paper.authors && paper.authors.length > 0 ? paper.authors.join(", ") : "Unknown Authors"}
            </Card.Subtitle>
            <Card.Text className="mt-2">{paper.abstract}</Card.Text>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Publication Date:</strong> {new Date(paper.publicationDate).toDateString()}</ListGroup.Item>
              <ListGroup.Item><strong>Created At:</strong> {new Date(paper.createdAt).toDateString()}</ListGroup.Item>
            </ListGroup>
            <Button href={paper.pdfUrl} target="_blank" variant="primary" className="mt-3">
              View Paper
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Research;
