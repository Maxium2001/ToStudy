import React, { useState } from "react";
import "./Style.css";

const AppuntiPage = () => {
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [selectedAppunto, setSelectedAppunto] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMateriaModalOpen, setIsAddMateriaModalOpen] = useState(false); // New state for adding a subject
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stato per gestire la visibilità del menu
  const [newMateria, setNewMateria] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [newComment, setNewComment] = useState("");

  const [materie, setMaterie] = useState([
    {
      nome: "Matematica",
      appunti: [
        { titolo: "Algebra", commento: "Appunto su Algebra" },
        { titolo: "Geometria", commento: "Appunto su Geometria" },
      ],
    },
    {
      nome: "Fisica",
      appunti: [
        { titolo: "Meccanica", commento: "Appunto su Meccanica" },
        { titolo: "Ottica", commento: "Appunto su Ottica" },
      ],
    },
  ]);

  const handleMateriaClick = (materia) => {
    setSelectedMateria(selectedMateria === materia ? null : materia);
  };

  const handleFileUpload = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  const handleAddAppunto = () => {
    if (newMateria && newTitle && uploadedFile && newComment) {
      const newAppunto = { titolo: newTitle, commento: newComment };
      setMaterie((prevMaterie) =>
        prevMaterie.map((materia) =>
          materia.nome === newMateria
            ? { ...materia, appunti: [...materia.appunti, newAppunto] }
            : materia
        )
      );
      alert(
        `Appunto "${newTitle}" aggiunto a ${newMateria} con file: ${uploadedFile.name}`
      );
      setIsModalOpen(false);
      setNewMateria("");
      setNewTitle("");
      setUploadedFile(null);
      setNewComment("");
    } else {
      alert("Compila tutti i campi!");
    }
  };

  const handleAddMateria = () => {
    if (newMateria) {
      setMaterie((prevMaterie) => [
        ...prevMaterie,
        { nome: newMateria, appunti: [] },
      ]);
      alert(`Materia "${newMateria}" aggiunta`);
      setIsAddMateriaModalOpen(false); // Close subject modal after adding
      setNewMateria("");
    } else {
      alert("Inserisci un nome per la materia!");
    }
  };

  return (
    <div className="AppuntiPage">
      {/* Colonna sinistra - Materie */}
      <div className="columnA">
        <h2>Materie</h2>
        <ul>
          {materie.map((materia, index) => (
            <li key={index}>
              <div
                className="materia"
                onClick={() => handleMateriaClick(materia.nome)}
              >
                {materia.nome}{" "}
                <span>{selectedMateria === materia.nome ? "▼" : "▶"}</span>
              </div>
              {selectedMateria === materia.nome && (
                <ul className="sottocategoria">
                  {materia.appunti.map((appunto, i) => (
                    <li key={i} onClick={() => setSelectedAppunto(appunto)}>
                      {appunto.titolo}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Colonna centrale - Appunti */}
      <div className="columnA centrale">
        <h2>Appunti</h2>
        {selectedMateria ? (
          <div className="appunti-list">
            {materie
              .find((m) => m.nome === selectedMateria)
              .appunti.map((appunto, index) => (
                <div
                  key={index}
                  className="appunto-box"
                  onClick={() => setSelectedAppunto(appunto)}
                >
                  <h3>{appunto.titolo}</h3>
                </div>
              ))}
          </div>
        ) : (
          <p>Seleziona una materia</p>
        )}
      </div>

      {/* Colonna destra - Dettagli */}
      <div className="columnA">
        <h2>Info Appunto</h2>
        {selectedAppunto ? (
          <>
            <p>Autore: Io</p>
            <h3>Commento</h3>
            <p>{selectedAppunto.commento}</p>
          </>
        ) : (
          <p>Seleziona un appunto</p>
        )}
      </div>

      {/* Pulsante flottante */}
      <div className="floating-button-container">
        <button
          className="floating-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          +
        </button>
        {isMenuOpen && (
          <div className="floating-menu">
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Inserisci Appunto
            </button>
            <button
              onClick={() => {
                setIsAddMateriaModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Aggiungi Materia
            </button>
          </div>
        )}
      </div>

      {/* Modale per aggiungere appunti */}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </span>
            <h2>Nuovo Appunto</h2>

            <label>Materia:</label>
            <select
              value={newMateria}
              onChange={(e) => setNewMateria(e.target.value)}
            >
              <option value="">Seleziona materia</option>
              {materie.map((m, index) => (
                <option key={index} value={m.nome}>
                  {m.nome}
                </option>
              ))}
            </select>

            <label>Titolo:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            <label>Allega File:</label>
            <div className="file-upload-box">
              <input type="file" onChange={handleFileUpload} />
              {uploadedFile && <p>{uploadedFile.name}</p>}
            </div>

            <label>Commento:</label>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />

            <button className="add-button" onClick={handleAddAppunto}>
              Aggiungi Appunto
            </button>
          </div>
        </div>
      )}

      {/* Modale per aggiungere materia */}
      {isAddMateriaModalOpen && (
        <div className={`modal ${isAddMateriaModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsAddMateriaModalOpen(false)}
            >
              ×
            </span>
            <h2>Aggiungi Nuova Materia</h2>

            <label>Nome Materia:</label>
            <input
              type="text"
              value={newMateria}
              onChange={(e) => setNewMateria(e.target.value)}
            />

            <button className="add-button" onClick={handleAddMateria}>
              Aggiungi Materia
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppuntiPage;
