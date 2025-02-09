import React, { useEffect, useState } from "react";
import "./Style.css";
import GruppiList from "./GruppiList";
import { useAuth } from "./Autenticato";
import axios from "axios";

const GruppiPage = () => {
  const { id } = useAuth(); // Ottieni l'ID utente autenticato
  const [groups, setGroups] = useState([]); // Stato per gestire i gruppi
  const [expandedGroups, setExpandedGroups] = useState([]); // Stato per gestire i gruppi espansi
  const [materie, setMaterie] = useState([]); // Stato per gestire le materie
  const [expandedMaterie, setExpandedMaterie] = useState([]); // Stato per gestire le materie espanse
  const [selectedMateria, setSelectedMateria] = useState(null); // Stato per gestire la materia selezionata
  const [selectedGruppi, setSelectedGruppi] = useState(null); // Stato per gestire il gruppo selezionato
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per gestire l'apertura del modale per aggiungere gruppi
  const [isAddMateriaModalOpen, setIsAddMateriaModalOpen] = useState(false); // Stato per gestire l'apertura del modale per aggiungere materie
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Stato per gestire l'apertura del menu popup
  const [newMateria, setNewMateria] = useState(""); // Stato per gestire il nome della nuova materia
  const [newTitle, setNewTitle] = useState(""); // Stato per gestire il titolo del nuovo gruppo
  const [newDescription, setNewDescription] = useState(""); // Stato per gestire la descrizione del nuovo gruppo
  const [newGroup, setNewGroup] = useState(""); // Stato per gestire il gruppo selezionato per la nuova materia

  useEffect(() => {
    const fetchData = async () => {
      await fetchGroups();
    };

    fetchData();
  }, []);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getusergroups", {
        params: { id: id },
      });
      console.log("Gruppi utente:", response.data);
      const groupData = response.data;
      setGroups(groupData);
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Errore nel recupero del gruppo:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Nessuna risposta ricevuta:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Errore nella richiesta:", error.message);
      }
    }
  };

  const fetchMaterie = async (groupId) => {
    try {
      const response = await axios.get("http://localhost:3000/getgroup", {
        params: { id: groupId },
      });
      return response.data.materie;
    } catch (error) {
      console.error("Errore nel recupero delle materie:", error);
      return [];
    }
  };

  // Funzione per gestire il click su un gruppo
  const handleGruppiClick = async (group) => {
    if (expandedGroups.includes(group.id)) {
      setExpandedGroups(expandedGroups.filter((id) => id !== group.id));
    } else {
      const materie = await fetchMaterie(group.id);
      setMaterie((prevMaterie) => [
        ...prevMaterie,
        ...materie.map((materia) => ({ ...materia, gruppo: group.id })),
      ]);
      setExpandedGroups([...expandedGroups, group.id]);
    }
  };

  // Funzione per gestire il click su una materia
  const handleMateriaClick = (materiaNome) => {
    setExpandedMaterie((prevExpandedMaterie) =>
      prevExpandedMaterie.includes(materiaNome)
        ? prevExpandedMaterie.filter((nome) => nome !== materiaNome)
        : [...prevExpandedMaterie, materiaNome]
    );
    setSelectedMateria(materiaNome);
  };

  const handleAddGruppo = async (e) => {
    e.preventDefault(); // Evita il comportamento predefinito del form (rinfrescare la pagina)

    if (!newTitle || !newDescription) {
      alert("Per favore, completa tutti i campi.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/creagroup", {
        nome: newTitle,
        descrizione: newDescription,
        _id: id, // Assicurati di passare un ID utente valido
      });

      if (response.status === 201) {
        alert("Gruppo creato con successo!");
        console.log("Gruppo salvato:", response.data); // Puoi vedere il gruppo appena creato
        setNewTitle("");
        setNewDescription("");
        setIsModalOpen(false);
        fetchGroups(); // Ricarica i gruppi
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
  const handleAddMateria = async (e) => {
    e.preventDefault(); // Evita il comportamento predefinito del form (rinfrescare la pagina)

    if (!newMateria || !newGroup) {
      alert("Per favore, completa tutti i campi.");
      return;
    }
    const gruppoId = groups.find((m) => m.nome === newGroup);
    console.log("Gruppo selezionato:", groups);
    try {
      const response = await axios.post("http://localhost:3000/creamateria", {
        nome: newMateria,
        autore: id,
        gruppo: gruppoId, // Ensure newGroup is an ObjectId
      });

      if (response.status === 201) {
        alert(`Materia "${newMateria}" aggiunta con successo!`);
        setMaterie((prevMaterie) => [
          ...prevMaterie,
          { nome: newMateria, gruppo: newGroup },
        ]);
        setNewMateria("");
        setNewGroup("");
        setIsAddMateriaModalOpen(false);
      }
    } catch (error) {
      console.error("Errore nell'aggiunta della materia:", error.response);
      alert(
        "Errore nell'aggiunta della materia: " +
          (error.response?.data?.message || "Errore sconosciuto")
      );
    }
  };

  // Funzione per aprire/chiudere il popup menu
  const togglePopup = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="GruppiPage">
      {/* Colonna sinistra - Gruppi */}
      <div className="columnG">
        <h2>Gruppi</h2>
        <ul>
          {groups.length > 0 ? (
            groups.map((group, index) => (
              <li key={index}>
                <div
                  className="Gruppi"
                  onClick={() => handleGruppiClick(group)}
                >
                  {group.nome}{" "}
                  <span>{expandedGroups.includes(group.id) ? "▼" : "▶"}</span>
                </div>
                {expandedGroups.includes(group.id) && (
                  <ul className="sottocategoria">
                    {materie
                      .filter((materia) => materia.gruppo === group.id)
                      .map((materia, i) => (
                        <li
                          key={i}
                          onClick={() => handleMateriaClick(materia.nome)}
                          className={
                            selectedMateria === materia.nome ? "selected" : ""
                          }
                        >
                          {materia.nome}
                        </li>
                      ))}
                  </ul>
                )}
              </li>
            ))
          ) : (
            <p>Nessun gruppo trovato.</p>
          )}
        </ul>
      </div>

      {/* Colonna centrale */}
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
            <label>Gruppo:</label>
            <select
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
            >
              <option value="">Seleziona gruppo</option>
              {groups.map((group, index) => (
                <option key={index} value={group.id}>
                  {group.nome}
                </option>
              ))}
            </select>

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
