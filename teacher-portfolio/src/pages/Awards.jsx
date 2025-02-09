import { useEffect, useState } from "react";
import axios from "../utils/axios";

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const URL = import.meta.env.VITE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const awardsRes = await axios.get(`${URL}/api/awards`);
        const collabRes = await axios.get(`${URL}/api/collaborations`);
        setAwards(awardsRes.data);
        setCollaborations(collabRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="awards-page">
      <div className="container mt-5">
        <h2 className="text-center mb-4 title">Awards & Collaborations</h2>

        <h2 className="mb-3">Awards</h2>
        <div className="row">
          {awards.map((award) => (
            <div key={award._id} className="col-md-4 mb-4">
              <div className="card shadow-sm glass-card">
                {award.imageUrl && (
                  <img
                    src={award.imageUrl}
                    alt={award.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{award.title}</h5>
                  <p className="card-text">
                    <strong>Organization:</strong> {award.organization.toUpperCase()}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {new Date(award.date).toDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2>Collaborations</h2>
          <div className="row">
            {collaborations.map((collab) => (
              <div key={collab._id} className="col-md-4 mb-4">
                <div className="card shadow-sm glass-card">
                  <div className="card-body">
                    <h5 className="card-title">{collab.projectTitle}</h5>
                    <p className="card-text">
                      <strong>Institution:</strong> {collab.institution}
                    </p>
                    <p className="card-text">
                      <strong>Start Date:</strong> {new Date(collab.startDate).toDateString()}
                    </p>
                    <p className="card-text">
                      <strong>End Date:</strong> {new Date(collab.endDate).toDateString()}
                    </p>
                    <p className="card-text">
                      <strong>Details:</strong> {collab.details}
                    </p>
                   
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          .awards-page {
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

          .card-img-top {
            height: 200px;
            object-fit: cover;
          }
        `}
      </style>
    </div>
  );
};

export default Awards;
