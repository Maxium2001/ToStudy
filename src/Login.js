import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Style.css";
import { useAuth } from "./Autenticato";

function Login() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data:", formData); // Log dei dati del form
    try {
      const response = await axios.post(
        "http://localhost:3000/login", // Assicurati che l'endpoint sia corretto
        formData
      );
      console.log("Response:", response); // Log della risposta del server
      if (response.status === 200) {
        setUserId(response.data.userId);
        login();
        navigate("/homepage");
      } else {
        setErrorMessage("Login fallito. Verifica le tue credenziali.");
      }
    } catch (error) {
      console.error("Error:", error); // Log dell'errore
      if (error.response) {
        setErrorMessage(error.response.data.message);
        // Il server ha risposto con uno stato diverso da 2xx
      } else if (error.request) {
        setErrorMessage(
          "Nessuna risposta dal server. Verifica che il server sia in esecuzione."
        );
        // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
      } else {
        setErrorMessage(error.message);
        // Qualcosa è andato storto nella configurazione della richiesta
      }
    }
  };

  return (
    <div>
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
        <Link to="/passworddimenticata">Password dimenticata?</Link>
        <button type="submit">Login</button>
        <p>
          Non hai un account?{" "}
          <Link to="/register">
            <img src="/user.png" alt="user" />
          </Link>
          Registrati qui
        </p>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;
