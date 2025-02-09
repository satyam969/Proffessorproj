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

      <style>
        {`
          .research-page {
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

          .search-input {
            max-width: 500px;
            border-radius: 25px;
            padding: 10px;
            font-size: 1.1rem;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.5);
            color: #333;
            transition: background 0.3s ease;
          }

          .search-input:focus {
            background: rgba(255, 255, 255, 0.8);
            outline: none;
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

export default Research;
