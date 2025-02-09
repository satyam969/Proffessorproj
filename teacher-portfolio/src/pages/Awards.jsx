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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Awards & Collaborations</h2>

      
      <h2 className="mb-3">Awards</h2>
      <div className="row">
        {awards.map((award) => (
          <div key={award._id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img 
                src={award.imageUrl} 
                alt={award.title} 
                className="card-img-top" 
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{award.title}</h5>
                <p className="card-text"><strong>Organization:</strong> {award.organization.toUpperCase()}</p>
                <p className="card-text"><strong>Date:</strong> {new Date(award.date).toDateString()}</p>
                
              </div>
            </div>
          </div>
        ))}
      </div>

     <div>
      <h2>Collaborations</h2>
      <div>
      {collaborations.map((collab) => (
          <div key={collab._id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{collab.projectTitle}</h5>
                <p className="card-text"><strong>Institution:</strong> {collab.institution}</p>
                <p className="card-text"><strong>Start Date:</strong> {new Date(collab.startDate).toDateString()}</p>
                <p className="card-text"><strong>End Date:</strong> {new Date(collab.endDate).toDateString()}</p>
                <p className="card-text"><strong>Details:</strong> {collab.details}</p>
                <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                  Created on: {new Date(collab.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
        </div>
       </div>
    </div>
  );
};

export default Awards;
