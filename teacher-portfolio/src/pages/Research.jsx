import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Card, ListGroup, Button } from "react-bootstrap";
import Tilt from "react-parallax-tilt";
import NavigationBar from "../components/Navbar";

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

  const filteredPapers = papers.filter((paper) =>
    paper.title.toLowerCase().includes(search.toLowerCase()) ||
    paper.authors.some((author) => author.toLowerCase().includes(search.toLowerCase())) ||
    paper.abstract.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="research-page">
      <NavigationBar />
      <h2 className="text-center mb-4 title">Research Papers</h2>
      <input
        type="text"
        placeholder="Search Papers..."
        className="form-control search-input my-3"
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filteredPapers.length === 0 ? (
          <p className=" text-white">No research papers found.</p>
        ) : (
          filteredPapers.map((paper) => (
            <div key={paper._id} className="m-2">
              <Tilt className="card shadow-lg p-3 rounded glass-card ">
                <Card.Body>
                  <Card.Title className="text-dark">{paper.title}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    {paper.authors && paper.authors.length > 0
                      ? paper.authors.join(", ")
                      : "Unknown Authors"}
                  </Card.Subtitle>
                  <Card.Text className="mt-2">{paper.abstract}</Card.Text>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <strong>Publication Date:</strong>{" "}
                      {new Date(paper.publicationDate).toDateString()}
                    </ListGroup.Item>
                  </ListGroup>
                  <div className="d-flex justify-content-center"><Button
                    href={paper.pdfUrl}
                    target="_blank"
                    variant="primary"
                    className="mt-3"
                    
                  >
                    View Paper
                  </Button></div>
                  
                </Card.Body>
              </Tilt>
            </div>
          ))
        )}
      </div>

     
    </div>
  );
};

export default Research;
