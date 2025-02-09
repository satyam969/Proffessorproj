import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL || "http://localhost:5000",
});

export default instance;
