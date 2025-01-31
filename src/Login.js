import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Register from "./Register";

function Login() {
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
      console.log(response.data.message);
    } catch (error) {
      if (error.response) {
        // Il server ha risposto con uno stato diverso da 2xx
        console.error("Error response:", error.response.data);
      } else if (error.request) {
        // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
        console.error("Error request:", error.request);
      } else {
        // Qualcosa è andato storto nella configurazione della richiesta
        console.error("Error message:", error.message);
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="Text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email o Username"
          required
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <p>
          Non hai un account? <Link to="/register">Registrati qui</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
