import React from "react";
import { NavLink } from "react-router-dom";

const ProfiloWidget = ({ imagePreview, handleFileChange, username }) => {
  return (
    <div className="profilo-widget-container">
      {/* Link per navigare alla pagina del profilo */}
      <NavLink to="/profilo">
        <h1>PROFILO</h1>
      </NavLink>
      {/* Widget della foto profilo e username */}
      <div className="profilo-widget">
        <div className="foto-username-container">
          <div className="foto-container">
            <img
              src={imagePreview || "default-image.jpg"} // Usa l'anteprima o un'immagine di default
              alt="Foto Profilo"
              className="foto-profilo"
            />
          </div>
          <div className="foto-upload">
            <input
              type="file"
              accept="image/*"
              id="foto-utente"
              className="foto-input"
              onChange={handleFileChange}
            />
            <label htmlFor="foto-utente" className="foto-label">
              Carica Foto
            </label>
          </div>
          <div className="username">{username || "Username"}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfiloWidget;
