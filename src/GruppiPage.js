import React, { useEffect, useState } from "react";
import "./Style.css";
import GruppiList from "./GruppiList";
import { useParams } from "react-router-dom";
import { useAuth } from "./Autenticato";
import axios from "axios";

const GruppiPage = () => {
  const { id } = useParams(); // Ottieni l'ID del gruppo dalla URL
  const [group, setGroup] = useState(null);
  const [expandedMaterie, setExpandedMaterie] = useState([]);
  const [selectedGruppi, setSelectedGruppi] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMateriaModalOpen, setIsAddMateriaModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newMateria, setNewMateria] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState(""); // Aggiungi newDescription allo stato
  const [materie, setMaterie] = useState([
    {
      nome: "Matematica",
      gruppi: [
        {
          titolo: "Gruppo 1",
          autore: "Autore 1",
          dataCreazione: "01/01/2023",
          files: [
            { nome: "Appunti.pdf", url: "/path/to/file1.pdf" },
            { nome: "Risultati.xlsx", url: "/path/to/file2.xlsx" },
          ],
        },
      ],
    },
  ]);

  useEffect(() => {
    const fetchGroupById = async () => {
      try {
        const response = await fetch(`http://localhost:3000/getgroup?id=${id}`);
        if (!response.ok) {
          throw new Error("Gruppo non trovato");
        }
        const data = await response.json();
        setGroup(data);
      } catch (error) {
        console.error("Errore nel recupero del gruppo", error);
      }
    };

    fetchGroupById();
  }, [id]); // Ricarica i dati quando cambia l'ID del gruppo

  // Funzione per gestire il click su una materia
  const handleMateriaClick = (materiaNome) => {
    setExpandedMaterie((prevExpandedMaterie) =>
      prevExpandedMaterie.includes(materiaNome)
        ? prevExpandedMaterie.filter((nome) => nome !== materiaNome)
        : [...prevExpandedMaterie, materiaNome]
    );
  };

  // Funzione per gestire il click su un gruppo
  const handleGruppiClick = (gruppo) => {
    setSelectedGruppi(gruppo);
  };

  const handleAddGruppo = async (e) => {
    e.preventDefault(); // Evita il comportamento predefinito del form (rinfrescare la pagina)

    if (!newTitle || !newDescription) {
      alert("Per favore, completa tutti i campi.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/creategroup", {
        nome: newTitle,
        descrizione: newDescription,
      });

      if (response.status === 200) {
        alert("Gruppo creato con successo!");
        console.log("Gruppo salvato:", response.data); // Puoi vedere il gruppo appena creato
        setNewTitle("");
        setNewDescription("");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Errore nel salvataggio del gruppo:", error.response);
      alert(
        "Errore nel salvataggio del gruppo: " +
          (error.response?.data?.message || "Errore sconosciuto")
      );
    }
  };

  // Funzione per aggiungere una nuova materia
  const handleAddMateria = async () => {
    if (newMateria) {
      try {
        // Chiamata al backend per aggiungere la materia
        const response = await fetch("http://localhost:3000/creatematerie", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: newMateria,
          }),
        });

        if (!response.ok) {
          throw new Error("Errore nell'aggiunta della materia");
        }

        const data = await response.json();
        alert(`Materia "${newMateria}" aggiunta`);
        setIsAddMateriaModalOpen(false);
        setNewMateria("");

        // Se necessario, aggiorna la UI o lo stato locale qui dopo che la materia è stata creata con successo
      } catch (error) {
        console.error("Errore nell'aggiungere la materia", error);
        alert("Errore durante l'aggiunta della materia.");
      }
    } else {
      alert("Inserisci un nome per la materia!");
    }
  };

  // Funzione per aprire/chiudere il popup menu
  const togglePopup = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="GruppiPage">
      {/* Colonna sinistra - Materie */}
      <div className="columnG">
        <h2>Materie</h2>
        <ul>
          {materie.map((materia, index) => (
            <li key={index}>
              <div
                className="materia"
                onClick={() => handleMateriaClick(materia.nome)}
              >
                {materia.nome}{" "}
                <span>
                  {expandedMaterie.includes(materia.nome) ? "▼" : "▶"}
                </span>
              </div>
              {expandedMaterie.includes(materia.nome) && (
                <ul className="sottocategoria">
                  {materia.gruppi &&
                    Array.isArray(materia.gruppi) &&
                    materia.gruppi.map((gruppo, i) => (
                      <li
                        key={i}
                        onClick={() => handleGruppiClick(gruppo)}
                        className={selectedGruppi === gruppo ? "selected" : ""}
                      >
                        {gruppo.titolo}
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Colonna centrale - Gruppi */}
      <GruppiList
        expandedMaterie={expandedMaterie}
        materie={materie}
        handleGruppiClick={handleGruppiClick}
      />

      {/* Colonna destra - Dettagli */}
      <div className="columnG">
        <h2>Info Gruppo</h2>
        {selectedGruppi ? (
          <>
            <p>Autore: {selectedGruppi.autore}</p>
            <p>Data di creazione: {selectedGruppi.dataCreazione}</p>

            {/* Visualizzazione dei file associati al gruppo */}
            <h3>File del Gruppo</h3>
            {selectedGruppi.files && selectedGruppi.files.length > 0 ? (
              <ul>
                {selectedGruppi.files.map((file, index) => (
                  <li key={index}>
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {file.nome}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nessun file caricato per questo gruppo.</p>
            )}
          </>
        ) : (
          <p>Seleziona un gruppo per visualizzare i dettagli</p>
        )}
      </div>

      {/* Pulsante flottante */}
      <button
        id="add-button"
        className={isMenuOpen ? "active" : ""}
        onClick={togglePopup}
      >
        +
      </button>
      <div id="popup-container" className={isMenuOpen ? "active" : ""}>
        <button
          onClick={() => {
            setIsModalOpen(true);
            setIsMenuOpen(false);
          }}
        >
          Inserisci Gruppo
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

      {/* Modale per aggiungere gruppi */}
      {isModalOpen && (
        <div className={`modal ${isModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </span>
            <h2>Nuovo Gruppo</h2>

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
            <label>Descrizione:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button className="add-button" onClick={handleAddGruppo}>
              Aggiungi Gruppo
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

export default GruppiPage;
