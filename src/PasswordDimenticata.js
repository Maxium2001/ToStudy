import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PasswordDimenticata = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleOtpGeneration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/generaotp", {
        email: email,
      }); // Assicurati che l'URL sia corretto
      if (response.status === 200) {
        setOtpSent(true);
        setErrorMessage("OTP inviato alla tua email");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("Errore: " + error.response.data.message);
      } else if (error.request) {
        setErrorMessage("Errore di rete. Per favore riprova.");
      } else {
        setErrorMessage("Errore: " + error.message);
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/confermaotp", {
        email: email,
        otp: otp,
      }); // Assicurati che l'URL sia corretto
      if (response.status === 200) {
        navigate("/resetpassword", { state: { email: email, otp: otp } });
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage("Errore: " + error.response.data.message);
      } else if (error.request) {
        setErrorMessage("Errore di rete. Per favore riprova.");
      } else {
        setErrorMessage("Errore: " + error.message);
      }
    }
  };

  return (
    <div>
      <h1>Password Dimenticata</h1>
      <form onSubmit={handleOtpGeneration}>
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
        <button type="submit">Genera OTP</button>
      </form>
      <form onSubmit={handleOtpSubmit}>
        <div>
          <label htmlFor="otp">OTP:</label>
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default PasswordDimenticata;
