import React, { useState } from "react";
import { useAuth } from "./AutenticatoContext";
import { NavLink } from "react-router-dom";
import ProfiloWidget from "./ProfiloWidget";
import axios from "axios";
import { useEffect } from "react";
import "./Style.css";

const ProfiloPage = () => {
  const [userData, setUserData] = useState({
    id: String,
    nome: String,
    cognome: String,
    email: String,
    istruzione: String,
  });

  const [istruzione, setIstruzione] = useState(userData.istruzione); // Stato per l'istruzione
  const [openIndex, setOpenIndex] = useState(null);
  const [sesso, setSesso] = useState(userData.sesso);
  const [eta, setEta] = useState(userData.eta);
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const { logout, id, setUserId } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:27017/getuserbyid`, {
          params: { id: id },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Errore nel recupero dell'username:", error);
      }
    };
    fetchUsername();
  }, [id]);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle della sezione
  };

  const changeProfile = async () => {
    try {
      const response = await axios.put(
        "http://localhost:27017/aggiornaprofilo",
        {
          id: id,
          sesso: sesso,
          eta: eta,
          istruzione: istruzione,
        }
      );
      if (response.status === 200) {
        setErrorMessage("Profilo aggiornato con successo.");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Errore nell'aggiornamento del profilo: " + error);
      setShowPopup(true);
    }
  };

  const changePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Le password non corrispondono.");
      return;
    }
    try {
      console.log(id, password, newPassword);
      const response = await axios.post(
        "http://localhost:27017/resetpassword",
        {
          id: id,
          password: password,
          newPassword: newPassword,
        }
      );
      if (response.status === 200) {
        setErrorMessage("Password aggiornata con successo.");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Errore nell'aggiornamento della password: " + error);
      setShowPopup(true);
    }
  };

  const logoutFunction = () => {
    logout();
    setUserId(null);
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
    <div className="profilo-page">
      {/* Componente ProfiloWidget */}
      <div id="little">
        {" "}
        <ProfiloWidget />
      </div>

      {/* Bottoni delle impostazioni */}
      <div className="Selettore">
        <div id="Titolo-container">
          <button className="Titolo" onClick={() => handleClick(0)}>
            Dettagli Profilo
            <span className={`arrow ${openIndex === 0 ? "open" : ""}`}>
              &#9662;
            </span>
          </button>
          {openIndex === 0 && (
            <div className="answer">
              <div className="categoria">
                <h4>Istruzione</h4>
                <select
                  value={userData.istruzione}
                  onChange={(e) => setIstruzione(e.target.value)}
                >
                  <option value="Elementari">Scuola Elementare</option>
                  <option value="Medie">Scuola Media</option>
                  <option value="Superiori">Scuola Superiore</option>
                  <option value="Università">Università</option>
                </select>
                <button className="mini-button" onClick={changeProfile}>
                  Aggiungi
                </button>
              </div>
              <div className="categoria">
                <h4>Informazioni di base</h4>
                <div className="campo">
                  Nome: <input type="text" value={userData.nome} readOnly />
                </div>
                <div className="campo">
                  Cognome:{" "}
                  <input type="text" value={userData.cognome} readOnly />
                </div>
                <div className="campo">
                  Selezione sesso:{" "}
                  <input
                    type="text"
                    placeholder={userData.sesso}
                    onChange={(e) => setSesso(e.target.value)}
                  />
                </div>
                <div className="campo">
                  Età:{" "}
                  <input
                    type="number"
                    placeholder={userData.eta}
                    onChange={(e) => setEta(e.target.value)}
                  />
                </div>
                <div className="campo">
                  Email: <input type="email" value={userData.email} readOnly />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Altre sezioni */}
        <div id="Titolo-container">
          <button className="Titolo" onClick={() => handleClick(1)}>
            Ripristina Password
            <span className={`arrow ${openIndex === 1 ? "open" : ""}`}>
              &#9662;
            </span>
          </button>
          {openIndex === 1 && (
            <div className="answer">
              <div className="campo">
                Password attuale:{" "}
                <input
                  type="password"
                  placeholder="Password Attuale"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="campo">
                Nuova password:{" "}
                <input
                  type="password"
                  placeholder="Nuova Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="campo">
                Ripeti nuova password:{" "}
                <input
                  type="password"
                  placeholder="Ripeti Nuova Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button className="mini-button" onClick={changePassword}>
                Modifica Password
              </button>
            </div>
          )}
        </div>

        <div id="Titolo-container">
          <button className="Titolo" onClick={() => handleClick(2)}>
            Privacy
            <span className={`arrow ${openIndex === 2 ? "open" : ""}`}>
              &#9662;
            </span>
          </button>
          {openIndex === 2 && (
            <div className="answer">
              <p>Informative sulla privacy.</p>
            </div>
          )}
        </div>

        <div id="Titolo-container">
          <button className="Titolo" onClick={() => handleClick(3)}>
            Accessibilità
            <span className={`arrow ${openIndex === 3 ? "open" : ""}`}>
              &#9662;
            </span>
          </button>
          {openIndex === 3 && (
            <div className="answer">
              <p>Linee guida sull'accessibilità dei siti web.</p>
            </div>
          )}
        </div>

        <NavLink to="/login">
          <button className="mini-button" onClick={logoutFunction}>
            Logout
          </button>
        </NavLink>
        <br />
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

export default ProfiloPage;
