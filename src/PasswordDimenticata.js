import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordDimenticata = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/forgotpassword",
        { email: email }
      ); // Assicurati che l'URL sia corretto
      if (response.status === 200) {
        // Assuming 201 is the status code for successful user creation
        navigate("/confermaotp");
        setMessage("Password inviata alla tua email");
      }
    } catch (error) {
      if (error.response) {
        // Il server ha risposto con uno stato diverso da 2xx
        setMessage("Errore: " + error.response.data.message);
      } else if (error.request) {
        // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
        setMessage("Errore di rete. Per favore riprova.");
      } else {
        // Qualcosa è andato storto nella configurazione della richiesta
        setMessage("Errore: " + error.message);
      }
    }
  };
  return (
    <div>
      <h2>Password Dimenticata</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button>Recupera Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordDimenticata;
