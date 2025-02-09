import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageTeachings = () => {
    const [teachings, setTeachings] = useState([]);
    const [formData, setFormData] = useState({
        institution: "",
        position: "",
        startDate: "",
        endDate: "",
        description: "",
    });
    const [editingId, setEditingId] = useState(null);

    const URL=import.meta.env.VITE_URL;

    useEffect(() => {
        fetchTeachings();
    }, []);

    const fetchTeachings = async () => {
        const { data } = await axios.get(`${URL}/api/teaching`);
        setTeachings(data);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`${URL}/api/teaching/${editingId}`, formData);
        } else {
            await axios.post(`${URL}/api/teaching`, formData);
        }
        setFormData({ institution: "", position: "", startDate: "", endDate: "", description: "" });
        setEditingId(null);
        fetchTeachings();
    };

    const handleEdit = (teaching) => {
        setFormData(teaching);
        setEditingId(teaching._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`${URL}/api/teaching/${id}`);
        fetchTeachings();
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Manage Teachings</h2>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="mb-2">
                    <label className="form-label">Institution</label>
                    <input type="text" className="form-control" name="institution" value={formData.institution} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">Position</label>
                    <input type="text" className="form-control" name="position" value={formData.position} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">Start Date</label>
                    <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleChange} required />
                </div>
                <div className="mb-2">
                    <label className="form-label">End Date</label>
                    <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleChange} />
                </div>
                <div className="mb-2">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">{editingId ? "Update" : "Add"} Teaching</button>
            </form>

            <div className="overflow-x-auto w-full">
    <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
            <tr className="bg-gray-200">
                <th className="border px-4 py-2">Institution</th>
                <th className="border px-4 py-2">Position</th>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Actions</th>
            </tr>
        </thead>
        <tbody>
            {teachings.map((teaching) => (
                <tr key={teaching._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{teaching.institution}</td>
                    <td className="border px-4 py-2">{teaching.position}</td>
                    <td className="border px-4 py-2">{new Date(teaching.startDate).toLocaleDateString()}</td>
                    <td className="border px-4 py-2">{teaching.endDate ? new Date(teaching.endDate).toLocaleDateString() : "Ongoing"}</td>
                    <td className="border px-4 py-2">{teaching.description}</td>
                    <td className="border px-4 py-2 flex space-x-2">
                        <button className="btn btn-warning" onClick={() => handleEdit(teaching)}>Edit</button>
                        <button className="btn btn-danger" onClick={() => handleDelete(teaching._id)}>Delete</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
</div>
        </div>
    );
};

export default ManageTeachings;
