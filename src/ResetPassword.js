import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

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
        "http://localhost:8000/passwordresetwithopt",
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
    <div className="containerPage">
      <h2>Reimposta Password</h2>
      <div className="listPage">
        <div className="barattoloPage">
          <div className="extra-container">
            <NavLink to="/passworddimenticata">
              <button type="submit" className="Extra">X</button>
            </NavLink>
          </div>
          <form onSubmit={handleSubmit} className="form-container" id="password-reset-form">
            <div className="form-group">
              <label htmlFor="password">Nuova Password:</label>
              <input
                type="password"
                id="password"
                className="input-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Conferma Password:</label>
              <input
                type="password"
                id="confirmPassword"
                className="input-confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Reimposta Password</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
