import React, { useEffect, useState } from "react";
import axios from "axios";

const URL=import.meta.env.VITE_URL;

const API_URL = `${URL}/api/collaborations`;

const ManageCollaboration = () => {
    const [collaborations, setCollaborations] = useState([]);
    const [formData, setFormData] = useState({
        institution: "",
        projectTitle: "",
        startDate: "",
        endDate: "",
        details: "",
    });
    const [editingId, setEditingId] = useState(null);

  
    useEffect(() => {
        fetchCollaborations();
    }, []);

    const fetchCollaborations = async () => {
        try {
            const { data } = await axios.get(API_URL);
            setCollaborations(data);
        } catch (error) {
            console.error("Error fetching collaborations:", error);
        }
    };

  
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, formData);
            } else {
                await axios.post(API_URL, formData);
            }
            setFormData({ institution: "", projectTitle: "", startDate: "", endDate: "", details: "" });
            setEditingId(null);
            fetchCollaborations();
        } catch (error) {
            console.error("Error saving collaboration:", error);
        }
    };

 
    const handleEdit = (collaboration) => {
        setFormData(collaboration);
        setEditingId(collaboration._id);
    };

    
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchCollaborations();
        } catch (error) {
            console.error("Error deleting collaboration:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Collaborations</h2>

           
            <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded shadow-lg">
                <input type="text" name="institution" placeholder="Institution" value={formData.institution} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
                <input type="text" name="projectTitle" placeholder="Project Title" value={formData.projectTitle} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required />
                <textarea name="details" placeholder="Details" value={formData.details} onChange={handleChange} className="w-full p-2 mb-2 border rounded" required></textarea>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">{editingId ? "Update" : "Create"} Collaboration</button>
            </form>

         
            <div className="border rounded shadow-lg p-4">
                <h3 className="text-xl font-semibold mb-2">Existing Collaborations</h3>
                {collaborations.length === 0 ? (
                    <p>No collaborations found.</p>
                ) : (
                    collaborations.map((collab) => (
                        <div key={collab._id} className="p-2 border-b flex justify-between items-center">
                            <div>
                                <p><strong>{collab.projectTitle}</strong> at {collab.institution}</p>
                                <p>{collab.startDate} - {collab.endDate}</p>
                            </div>
                            <div>
                                <button onClick={() => handleEdit(collab)} className="bg-yellow-500 text-white p-1 rounded mx-2">Edit</button>
                                <button onClick={() => handleDelete(collab._id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageCollaboration;
