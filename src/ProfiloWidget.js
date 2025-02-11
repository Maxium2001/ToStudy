import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AutenticatoContext";
import { useProfileImage } from "./ProfileImageContext";

const ProfiloWidget = () => {
  const { id } = useAuth();
  const [username, setUsername] = useState("Utente123");
  const { profileImage, setProfileImage } = useProfileImage();

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getuserbyid", {
          params: { id: id },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Errore nel recupero dell'username:", error);
      }
    };
    fetchUsername();
    fetchIcon();
    console.log(profileImage);
  }, [id]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("icon", file);
        formData.append("autore", id);
        await axios.post(`http://localhost:3000/uploadicon`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const previewUrl = window.URL.createObjectURL(file);
        setProfileImage(previewUrl);
        alert("Anteprima creata con successo");
      } catch (error) {
        console.error("Errore durante la creazione dell'anteprima:", error);
      }
    }
  };

  const fetchIcon = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/geticon`, {
        params: { id: id },
        responseType: "blob",
      });
      const iconUrl = URL.createObjectURL(response.data);
      setProfileImage(iconUrl);
      console.log("Icona caricata con successo");
    } catch (error) {
      console.error("Errore nel recupero dell'icona:", error);
    }
  };

  return (
    <div className="profilo-widget-container">
      {/* Link per navigare alla pagina del profilo */}

      <h2>PROFILO</h2>

      {/* Widget della foto profilo e username */}
      <div className="barattolo">
        <div className="foto-username-container">
          <div className="foto-container">
            {/* Se c'è un'anteprima, visualizza l'immagine, altrimenti mostra "Foto" */}
            {profileImage ? (
              <img
                src={profileImage}
                alt="Foto Profilo"
                className="foto-profilo"
                onClick={() => document.getElementById("foto-utente").click()} // Cliccando sull'immagine si apre il file input
              />
            ) : (
              <span className="fallback-text">Foto</span>
            )}
            {/* Icona di modifica sopra l'immagine */}
            <label htmlFor="foto-utente" className="foto-label">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="foto-icon"
              >
                <path d="M13.586 4.586a2 2 0 012.828 0l2 2a2 2 0 010 2.828l-10 10A2 2 0 017.828 20H5a1 1 0 01-1-1v-2.828a2 2 0 01.586-1.414l10-10zM15 7l-2-2-8.586 8.586A1 1 0 004 14v2h2a1 1 0 00.707-.293L15 7z" />
              </svg>
            </label>
          </div>
          <div className="foto-upload">
            {/* File input per caricare una nuova foto */}
            <input
              type="file"
              accept="image/*"
              id="foto-utente"
              className="foto-input"
              onChange={handleFileChange}
              style={{ display: "none" }} // Nascondi il file input
            />
          </div>
          {/* Visualizza il nome dell'utente */}
          <p className="gruppo">{username || "Username"}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfiloWidget;
