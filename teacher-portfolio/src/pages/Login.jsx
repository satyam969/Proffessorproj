import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../utils/axios";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const res = await axios.post("/api/users/login", { email, password });
      toast.success("Login successful!");
      localStorage.setItem("auth", JSON.stringify(res?.data));
      navigate("/");
    } catch (error) {
      toast.error("Login failed!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-96 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col space-y-4">
          <input type="email" placeholder="Email" className="p-3 border rounded-md" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="p-3 border rounded-md" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="bg-blue-600 text-white py-2 rounded-md">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
