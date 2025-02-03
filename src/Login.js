import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
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
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        formData
      ); // Assicurati che l'URL sia corretto
      console.log("Loggin successfully");
      if (response.status === 200) {
        navigate("/");
        console.log("Loggin succes`sfully");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("Utente gia registrato");
        // Il server ha risposto con uno stato diverso da 2xx
      } else if (error.request) {
        // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
        setErrorMessage("Errore nel server, contattare l'amministratore");
      } else {
        // Qualcosa è andato storto nella configurazione della richiesta
        setErrorMessage("Errore sconosciuto, contattare l'amministratore");
      }
    }
  };

  return (
    <div>
      <h1>Accedi</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="Text"
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
        <button type="submit">Accedi</button>
        <p>
          Non hai un account?{" "}
          <Link to="/register">
            <img src="/logo.png" alt="Logo" />
          </Link>
          Registrati qui
        </p>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;
