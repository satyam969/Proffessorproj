import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      await axios.post("/api/users/register", { name, email, password });
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-96 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col space-y-4">
          <input type="text" placeholder="Full Name" className="p-3 border rounded-md" value={name} onChange={(e) => setName(e.target.value)} />
          <input type="email" placeholder="Email" className="p-3 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="p-3 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="bg-green-600 text-white py-2 rounded-md">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
