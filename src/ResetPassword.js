import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const PasswordReset = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Le password non corrispondono.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3001/passwordresetwithopt",
        {
          email: email,
          otp: otp,
          password: password,
        }
      );
      if (response.status === 200) {
        navigate("/homepage");
      }
    } catch (error) {
      if (error.response) {
        // Il server ha risposto con uno stato diverso da 2xx
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
        setErrorMessage(error.request);
      } else {
        // Qualcosa è andato storto nella configurazione della richiesta
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <div>
      <h1>Reimposta Password</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password">Nuova Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div>
            <label htmlFor="confirmPassword">Conferma Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="submit">Reimposta Password</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default PasswordReset;
