import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router}  from "react-router-dom"
import { AuthProvider } from "./context/userContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ToastContainer autoClose={3000} />  
  <Router> 
    <App />
    </Router>
    </AuthProvider>
  </StrictMode>,
)
