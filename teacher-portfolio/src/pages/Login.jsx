import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Button, Container, Card } from "react-bootstrap";
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
    <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)" }}>
      <Container className="d-flex justify-content-center align-items-center">
        <Card className="bg-transparent shadow-lg p-4" style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(255, 255, 255, 0.2)", borderRadius: "15px", width: "100%", maxWidth: "400px" }}>
          <h2 className="text-center text-white mb-4">Login</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white border-white"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-4">
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white border-white"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mb-3">
              Login
            </Button>

            <div className="text-center">
              <p className="text-white" style={{ fontSize: "14px" }}>
                Don't have an account?{" "}
                <span
                  style={{ color: "#1e90ff", cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Sign up here
                </span>
              </p>
            </div>
          </Form>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
