import React, { useState, useEffect } from "react";
import { useAuth } from "./AutenticatoContext";
import { useNavigate } from "react-router-dom";
import ProfiloWidget from "./ProfiloWidget";
import axios from "axios";
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
const [showLogoutPopup, setShowLogoutPopup] = useState(false);
const navigate = useNavigate();

const confirmLogout = () => {
  logout();
  setUserId(null);
  navigate("/login"); // Redirigi alla pagina di login
};

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div onClick={onCancel}>
      <div className="LogoutPopup" onClick={(e) => e.stopPropagation()}>
        <p>Sicuro di voler uscire dall'account?</p>
        <div>
          <button className="popup" onClick={onConfirm}>
            Sì
          </button>
          <button className="popup" onClick={onCancel}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getuserbyid`, {
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

  const handleChange = (e) => {
    const valore = parseInt(e.target.value, 10);
    if (valore < 12) {
      setShowPopup(true);
      setErrorMessage("Devi inserire un'età di almeno 12 anni!");
      setEta(12);
    } else {
      setEta(valore);
    }
  };

  const changeProfile = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8000/aggiornaprofilo",
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
      const response = await axios.post("http://localhost:8000/resetpassword", {
        id: id,
        password: password,
        newPassword: newPassword,
      });
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
    setShowLogoutPopup(true); // Mostra il popup di conferma logout
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
                  <option value="">Istruzione</option>  
                  <option value="Elementari">Scuola Elementare</option>
                  <option value="Medie">Scuola Media</option>
                  <option value="Superiori">Scuola Superiore</option>
                  <option value="Università">Università</option>
                </select>
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
                    Selezione sesso:
                    <select value={sesso} onChange={(e) => setSesso(e.target.value)}>
                      <option value="">Sesso</option>
                      <option value="Maschio">Maschio</option>
                      <option value="Femmina">Femmina</option>
                      <option value="Altro">Altro</option>
                    </select>
                  </div>
                <div className="campo">Età: 
                  <input type="number" min={12} value={eta} onChange={handleChange} />
                </div>

                <div className="campo">
                  Email: <input type="email" value={userData.email} readOnly />
                </div>
              </div>
              <button className="mini-button" onClick={changeProfile}>
                  Aggiungi
                </button>
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
              <p>Informativa sulla Privacy<br/>

                Ultimo aggiornamento: 1 Gennaio 2025<br/>

                Questa informativa descrive il trattamento dei dati personali su ToStudy.<br/>

                Dati Raccolti<br/>
                Raccogliamo:<br/>
                - Dati di navigazione: IP, browser, dispositivo;<br/>
                - Dati forniti dall'utente: nome, email.<br/>

                Finalità e Base Giuridica<br/>
                Trattiamo i dati per fornire servizi, rispondere a richieste, inviare comunicazioni promozionali (con consenso) e adempiere a obblighi legali.
                <br/>
                Conservazione e Sicurezza<br/>
                I dati sono protetti e conservati per il tempo necessario agli scopi indicati.<br/>

                Condivisione dei Dati<br/>
                Non vendiamo dati, ma possiamo condividerli con fornitori di servizi e autorità competenti.<br/>

                Diritti degli Utenti<br/>
                Gli utenti possono richiedere accesso, modifica, cancellazione, limitazione, opposizione e portabilità dei dati, nonché revocare il consenso.
                <br/>
                Modifiche e Contatti<br/>
                L’informativa può essere aggiornata.<br/>
              </p>
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
              <p>Il nostro sito è progettato per offrire un’esperienza di navigazione intuitiva e accessibile a tutti gli utenti. Abbiamo adottato accorgimenti per migliorare la leggibilità e la fruizione dei contenuti, tra cui:
                Interfaccia semplice e intuitiva, per facilitare l’uso del sito da parte di chiunque.<br/>
                Colori con elevato contrasto, per garantire una migliore leggibilità.<br/>
                Struttura chiara e ordinata, per rendere la navigazione più agevole.<br/>
                Se hai suggerimenti per migliorare ulteriormente l’accessibilità, saremo lieti di ascoltarli</p>
            </div>
          )}
        </div>
          <button className="mini-button" onClick={logoutFunction}>
            Logout
          </button>
        <br />
      </div>
       {showLogoutPopup && (
        <LogoutPopup
          onConfirm={confirmLogout}
          onCancel={() => setShowLogoutPopup(false)}
        />
      )}
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
