import React, { use, useEffect, useState } from "react";
import "./Style.css";
import GruppiList from "./GruppiList";
import { useAuth } from "./Autenticato";
import axios from "axios";

const GruppiPage = () => {
  const { id } = useAuth();

  // Stati per gruppi e materie
  const [groups, setGroups] = useState([]); // Elenco dei gruppi
  const [expandedGroups, setExpandedGroups] = useState([]); // Array degli ID dei gruppi espansi
  const [materie, setMaterie] = useState([]); // Elenco di tutte le materie caricate
  const [selectedMateria, setSelectedMateria] = useState(null);

  // Stati per la gestione dei modali e per i nuovi dati da inserire
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMateriaModalOpen, setIsAddMateriaModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newMateria, setNewMateria] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newGroup, setNewGroup] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await fetchGroups();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      fetchMaterie();
    }
  }, [groups]);

  // Carica i gruppi dall'API
  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getusergroups", {
        params: { id: id },
      });
      setGroups(response.data);
    } catch (error) {
      console.error("Errore nel recupero dei gruppi:", error);
    }
  };

  // Funzione per ottenere tutte le materie
  const fetchMaterie = async () => {
    try {
      const m = groups.flatMap((group) => group.materie);
      const p = [];
      for (let i = 0; i < m.length; i++) {
        const response = await axios.get("http://localhost:3000/getmateria", {
          params: { id: m[i] },
        });
        p.push(response.data);
      }
      setMaterie(p); // Popola lo stato con tutte le materie
    } catch (error) {
      console.error("Errore nel recupero delle materie:", error);
    }
  };

  // Funzione per gestire l'espansione dei gruppi
  const handleGruppiClick = async (group) => {
    const groupId = group._id || group.id;
    if (expandedGroups.includes(groupId)) {
      setExpandedGroups(expandedGroups.filter((id) => id !== groupId));
    } else {
      // Qui puoi decidere di caricare materie specifiche per un gruppo, se necessario
      setExpandedGroups([...expandedGroups, groupId]);
    }
  };

  // Gestisce il click su una materia (se necessario)
  const handleMateriaClick = (materia) => {
    setSelectedMateria(materia);
    console.log(materie);
  };

  // ***********************
  // Definizione delle funzioni per aggiungere gruppi e materie
  // ***********************

  // Funzione per aggiungere un nuovo gruppo
  const handleAddGruppo = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      alert("Completa tutti i campi per il gruppo");
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
        setNewTitle("");
        setNewDescription("");
        setIsModalOpen(false);
        fetchGroups(); // Ricarica i gruppi
      }
    } catch (error) {
      console.error("Errore nel salvataggio del gruppo:", error);
      alert("Errore nel salvataggio del gruppo");
    }
  };

  // Funzione per aggiungere una nuova materia
  const handleAddMateria = async (e) => {
    e.preventDefault();
    if (!newMateria || !newGroup) {
      alert("Completa tutti i campi per la materia");
      return;
    }
    try {
      if (materie.find((m) => m.nome === newMateria)) {
        alert("Materia già esistente");
      }
      const response = await axios.post("http://localhost:3000/creamateria", {
        nome: newMateria,
        autore: id,
        gruppo: newGroup, // Utilizza l'ID del gruppo selezionato
      });
      if (response.status === 201) {
        alert(`Materia "${newMateria}" aggiunta con successo!`);
        setMaterie((prevMaterie) => [
          ...prevMaterie,
          { nome: newMateria, gruppo: newGroup, appunti: [] },
        ]);
        setNewMateria("");
        setNewGroup("");
        setIsAddMateriaModalOpen(false);
      }
    } catch (error) {
      console.error("Errore nell'aggiunta della materia:", error);
      alert("Errore nell'aggiunta della materia");
    }
  };

  // Funzione per aprire/chiudere il menu popup
  const togglePopup = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="PageGA">
      {/* Colonna sinistra: Elenco dei gruppi */}
      <div className="column">
        <h2>GRUPPI</h2>
        <ul>
          {groups.map((group) => {
            const groupId = group._id || group.id;
            return (
              <li key={groupId}>
                <div
                  className="gruppo"
                  onClick={() => handleGruppiClick(group)}
                >
                  {group.nome}{" "}
                  <span>{expandedGroups.includes(groupId) ? "▼" : "▶"}</span>
                </div>
                {expandedGroups.includes(groupId) && (
                  <ul className="sottocategoria">
                    {materie
                      .filter((m) => m.gruppo === groupId)
                      .map((materia) => {
                        const materiaId = materia._id || materia.id;
                        return (
                          <li
                            key={materiaId}
                            onClick={() => handleMateriaClick(materia)}
                            className={
                              selectedMateria &&
                              (selectedMateria._id || selectedMateria.id) ===
                                materiaId
                                ? "selected"
                                : ""
                            }
                          >
                            {materia.titolo || materia.nome}
                          </li>
                        );
                      })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <GruppiList
        groups={groups}
        materie={materie} // Usa lo stato 'materie' definito
        expandedGroups={expandedGroups}
        handleGruppiClick={handleGruppiClick}
        handleMateriaClick={handleMateriaClick}
        selectedMateria={selectedMateria}
      />

      {/* Colonna destra: Dettagli (ad esempio della materia selezionata) */}
      <div className="column">
        <h2>INFO GRUPPO</h2>
        {selectedMateria ? (
          <>
            <p>{selectedMateria.titolo || selectedMateria.nome}</p>
            {/* Altri dettagli se necessari */}
          </>
        ) : (
          <p>Seleziona un gruppo per visualizzare i dettagli</p>
        )}
      </div>

      {/* Pulsante flottante e popup menu */}
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

      {/* Modale per aggiungere materie */}
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
              {groups.map((group) => (
                <option
                  key={group._id || group.id}
                  value={group._id || group.id}
                >
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
