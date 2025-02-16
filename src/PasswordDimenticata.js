import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const PasswordDimenticata = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleOtpGeneration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/generaotp", {
        email: email,
      }); // Assicurati che l'URL sia corretto
      if (response.status === 200) {
        setErrorMessage("OTP generato con successo. Controlla la tua email.");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Errore: " + error.message);
      setShowPopup(true);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/confermaotp", {
        email: email,
        otp: otp,
      }); // Assicurati che l'URL sia corretto
      if (response.status === 200) {
        navigate("/resetpassword", { state: { email: email, otp: otp } });
      }
    } catch (error) {
      setErrorMessage("Errore: " + error.message);
    }
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

  return (
    <div className="containerPage">
      <h2>Password Dimenticata</h2>
      <div className="listPage">
        {/* Form per generare l'OTP */}
        <div className="barattoloPage">
        <div className="extra-container">
            <NavLink to="/login">
              <button type="submit" className="Extra">X</button>
            </NavLink>
          </div>
          <form
            onSubmit={handleOtpGeneration}
            className="form-container"
            id="otp-generation"
          >
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="input-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">
              Genera OTP
            </button>
          </form>
        

        {/* Form per confermare l'OTP */}
        
          <form
            onSubmit={handleOtpSubmit}
            className="form-container"
            id="otp-confirmation"
          >
            <div className="form-group">
              <label htmlFor="otp">OTP:</label>
              <input
                type="text"
                id="otp"
                className="input-otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" >
              Conferma OTP
            </button><br/>
          </form>
          
        </div>
        
      </div>
      

      {showPopup && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default PasswordDimenticata;
