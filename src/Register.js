import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Autenticato";

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
        "http://localhost:3000/register",
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
      <p>
       <p className="L-accedi" > Sei già registrato?{" "}</p>
        <Link className="L-accedi" to="/login">
          <img className="img-accedi" src="/user.png" />
        </Link>
       <p className="L-accedi"> Accedi </p>
      </p>
      <form onSubmit={handleSubmit} className="register-form">
        <input
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
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="full-width"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="full-width"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="full-width"
        />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Conferma Password"
          required
          className="full-width"
        />
        <input
          type="checkbox"
          name="terms"
          checked={formData.terms || false}
          onChange={(e) =>
            setFormData({ ...formData, terms: e.target.checked })
          }
          required
        />
        <label htmlFor="terms">
          <p className="L-accedi" >Accetto i  
          <Link to="/termsandconditions">Termini e Condizioni</Link></p>
        </label>
        <button type="submit">Crea account</button>
      </form>
      {showPopup && <ErrorPopup message={errorMessage} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default Register;
