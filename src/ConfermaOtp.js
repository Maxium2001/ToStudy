import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordDimenticata = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/confermaotp", {
        otp: otp,
      }); // Assicurati che l'URL sia corretto
      if (response.status === 200) {
        // Assuming 201 is the status code for successful user creation
        navigate("/");
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
      <h2>Controlla la tua mail</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">Codice OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <button type="submit">Conferma OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PasswordDimenticata;
