import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AutenticatoContext";

const Register = () => {
  const navigate = useNavigate();
  const { login, setUserId } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    username: "",
    password: "",
  });

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage("Le password non corrispondono");
        setShowPopup(true);
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/register",
        formData
      );
      if (response.status === 201) {
        setUserId(response.data.userId);
        login();
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
      setShowPopup(true);
    }
  };

  return (
    <div className="accedi">
      <h1>Crea il tuo account To Study</h1>
      <div className="L-accedi-container">
        <p className="L-accedi">Sei già registrato?</p>
        <Link className="L-accedi" to="/login">
          <span className="register-link">
            <img className="img-accedi" src="/user.png" alt="user" />
            Accedi
          </span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="register-form">
        <input className="input-group"
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
        />
        <input
          type="text"
          name="cognome"
          value={formData.cognome}
          onChange={handleChange}
          placeholder="Cognome"
          required
        />
        <input className="input-group"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input className="input-group"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input className="input-group"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Conferma Password"
          required
        />
        <div className="terms-container">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            checked={formData.terms || false}
            onChange={(e) =>
              setFormData({ ...formData, terms: e.target.checked })
            }
            required
          />
          <label htmlFor="terms">
            <Link to="/termsandconditions">Accetto i Termini e Condizioni</Link>
          </label>
        </div>

        <button type="submit" >Crea account</button>
      </form>
      {showPopup && (
        <ErrorPopup
          message={errorMessage}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};


export default Register;
