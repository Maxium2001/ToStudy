import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import { useAuth } from "./Autenticato";


function Login() {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const { login, setUserId } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const ErrorPopup = ({ message, onClose }) => {
    return (
      <div className="error-popup">
        <div className="error-content">
          <p>{message}</p>
          <button onClick={onClose}>Chiudi</button>
        </div>
      </div>
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData);
  
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      );
      console.log("Response:", response);
  
      if (response.status === 200) {
        setUserId(response.data.userId);
        login();
        navigate("/homepage");
      } else {
        setErrorMessage("Login fallito. Verifica le tue credenziali.");
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error:", error);
      let message = "Si è verificato un errore. Riprova.";
  
      if (error.response) {
        message = error.response.data.message;
      } else if (error.request) {
        message = "Nessuna risposta dal server. Verifica che il server sia in esecuzione.";
      } else {
        message = error.message;
      }
  
      setErrorMessage(message);
      setShowPopup(true);
    }
  };
  
 
  return (
    <div className="accedi">
      <h1>Accedi</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email o Username*"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password*"
          required
        />
        <Link className="L-accedi" to="/passworddimenticata">Password dimenticata?</Link>
        <button type="submit">Login</button>
        <p>
        <p className="L-accedi"> Non hai un account?{" "} </p>
          <Link className="L-accedi" to="/register">
            <img className="img-accedi" src="/user.png" alt="user" />
          </Link>
         <p className="L-accedi" > Registrati qui </p>
        </p>
      </form>
      {showPopup && <ErrorPopup message={errorMessage} onClose={() => setShowPopup(false)} />}

    </div>
  );
}

export default Login;
