import React, { useState } from 'react';
import { useAuth } from './Autenticato';
import { NavLink } from 'react-router-dom';
import ProfiloWidget from './ProfiloWidget';
import './Style.css';

const ProfiloPage = () => {
  const userData = {
    nome: 'Mario',
    cognome: 'Rossi',
    email: 'mario.rossi@email.com',
    istruzione: 'Università',
  };

  const [istruzione, setIstruzione] = useState(userData.istruzione); // Stato per l'istruzione
  const [imagePreview, setImagePreview] = useState(null); // Stato per l'anteprima dell'immagine
  const [username, setUsername] = useState('Utente123');
  const [openIndex, setOpenIndex] = useState(null);
  const { logout } = useAuth();

  const handleIstruzioneChange = (event) => {
    setIstruzione(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      console.log('Foto caricata:', file);
    }
  };

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle della sezione
  };

  return (
    <div className="profilo-page">
      {/* Componente ProfiloWidget */}
      <ProfiloWidget
        imagePreview={imagePreview}
        handleFileChange={handleFileChange}
        username={username}
      />

      {/* Bottoni delle impostazioni */}
      <div className="Selettore">
        <div id="Titolo-container">
          <button className="Titolo" onClick={() => handleClick(0)}>
            Dettagli Profilo
            <span className={`arrow ${openIndex === 0 ? 'open' : ''}`}>&#9662;</span>
          </button>
          {openIndex === 0 && (
            <div className="answer">
              <div className="categoria">
                <h4>Istruzione</h4>
                <select value={istruzione} onChange={handleIstruzioneChange}>
                  <option value="Elementari">Scuola Elementare</option>
                  <option value="Medie">Scuola Media</option>
                  <option value="Superiori">Scuola Superiore</option>
                  <option value="Università">Università</option>
                </select>
                <button className="mini-button">Aggiungi</button>
              </div>
              <div className="categoria">
                <h4>Informazioni di base</h4>
                <div className="campo">
                  Nome: <input type="text" value={userData.nome} readOnly />
                </div>
                <div className="campo">
                  Cognome: <input type="text" value={userData.cognome} readOnly />
                </div>
                <div className="campo">
                  Selezione sesso: <input type="text" placeholder="Sesso" />
                </div>
                <div className="campo">
                  Età: <input type="number" placeholder="Età" />
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
            <span className={`arrow ${openIndex === 1 ? 'open' : ''}`}>&#9662;</span>
          </button>
          {openIndex === 1 && (
            <div className="answer">
              <div className="campo">
                Password attuale: <input type="password" placeholder="Password Attuale" />
              </div>
              <div className="campo">
                Nuova password: <input type="password" placeholder="Nuova Password" />
              </div>
              <div className="campo">
                Ripeti nuova password: <input type="password" placeholder="Ripeti Nuova Password" />
              </div>
              <button className="mini-button">Modifica Password</button>
            </div>
          )}
        </div>

        <div id="Titolo-container">
          <button className="Titolo" onClick={() => handleClick(2)}>
            Privacy
            <span className={`arrow ${openIndex === 2 ? 'open' : ''}`}>&#9662;</span>
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
            <span className={`arrow ${openIndex === 3 ? 'open' : ''}`}>&#9662;</span>
          </button>
          {openIndex === 3 && (
            <div className="answer">
              <p>Linee guida sull'accessibilità dei siti web.</p>
            </div>
          )}
        </div>

        <NavLink to="/Login">
          <button className="mini-button" onClick={logout}>
            Logout
          </button>
        </NavLink>
        <br />
      </div>
    </div>
  );
};

export default ProfiloPage;