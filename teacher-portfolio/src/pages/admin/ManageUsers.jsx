import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Container } from "react-bootstrap";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const URL=import.meta.env.VITE_URL;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${URL}/api/users`);

      console.log(response);
      
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${URL}/api/users/${id}`);
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error("Error deleting user", error);
      }
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <h2 className="my-4">Manage Users</h2>
      <Form.Group controlId="search">
        <Form.Control
          type="text"
          placeholder="Search users by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <div className="table-responsive mt-3">
  <Table striped bordered hover className="w-100">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers.map(user => (
        <tr key={user._id}>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>
            <Button variant="danger" size="sm" onClick={() => deleteUser(user._id)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
</div>
    </Container>
  );
};

export default ManageUsers;
