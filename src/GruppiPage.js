import React, { use, useEffect, useState } from "react";
import "./Style.css";
import GruppiList from "./GruppiList";
import { useAuth } from "./AutenticatoContext";
import axios from "axios";

const GruppiPage = () => {
  const { id } = useAuth();

  // Stati per gruppi e materie
  const [groups, setGroups] = useState([]); // Elenco dei gruppi
  const [expandedGroups] = useState([]); // Array degli ID dei gruppi espansi
  const [materie, setMaterie] = useState([]); // Elenco di tutte le materie caricate
  const [selectedMateria, setSelectedMateria] = useState(null);
  const [isDeleteGroupModalOpen, setIsDeleteGroupModalOpen] = useState(false);

  // Stati per la gestione dei modali e per i nuovi dati da inserire
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMateriaModalOpen, setIsAddMateriaModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newMateria, setNewMateria] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newGroup, setNewGroup] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(null);

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
      const response = await axios.get("http://localhost:8000/getusergroups", {
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
        const response = await axios.get("http://localhost:8000/getmateria", {
          params: { id: m[i] },
        });
        p.push(response.data);
      }
      setMaterie(p); // Popola lo stato con tutte le materie
    } catch (error) {
      console.error("Errore nel recupero delle materie:", error);
    }
  };

  const handleGruppiClick = (group) => {
    const groupId = group._id || group.id;

    // Se il gruppo cliccato è già selezionato, lo deselezioniamo (toggle)
    if (selectedGroup === groupId) {
      setSelectedGroup(null);
    } else {
      setSelectedGroup(groupId);
    }
  };

  // Gestisce il click su una materia (se necessario)
  const handleMateriaClick = (materia) => {
    setSelectedMateria(materia);
  };

  // ***********************
  // Definizione delle funzioni per aggiungere gruppi e materie
  // ***********************

  // Funzione per aggiungere un nuovo gruppo
  const handleAddGruppo = async (e) => {
    e.preventDefault();
    if (!newTitle || !newDescription) {
      setErrorMessage("Inserisci tutti i campi per creare un gruppo");
      setShowPopup(true);
    }
    try {
      const response = await axios.post("http://localhost:8000/creagroup", {
        nome: newTitle,
        descrizione: newDescription,
        _id: id, // Assicurati di passare un ID utente valido
      });
      if (response.status === 201) {
        setNewTitle("");
        setNewDescription("");
        setIsModalOpen(false);
        fetchGroups(); // Ricarica i gruppi
        setErrorMessage("Gruppo creato con successo");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Compila tutti i campi");
      setShowPopup(true);
    }
  };

  // Funzione per aggiungere una nuova materia
  const handleAddMateria = async (e) => {
    e.preventDefault();
    if (!newMateria || !newGroup) {
      setErrorMessage("Compila tutti i campi");
      setShowPopup(true);
    }
    try {
      if (materie.find((m) => m.nome === newMateria)) {
        setErrorMessage("Materia già esistente");
        setShowPopup(true);
      }
      const response = await axios.post("http://localhost:8000/creamateria", {
        nome: newMateria,
        autore: id,
        gruppo: newGroup, // Utilizza l'ID del gruppo selezionato
      });
      if (response.status === 201) {
        setMaterie((prevMaterie) => [
          ...prevMaterie,
          { nome: newMateria, gruppo: newGroup, appunti: [] },
        ]);
        setNewMateria("");
        setNewGroup("");
        setIsAddMateriaModalOpen(false);
        setErrorMessage("Materia creata con successo");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage("Compila tutti i campi");
      setShowPopup(true);
    }
  };

  // Funzione per aprire/chiudere il menu popup
  const togglePopup = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleRimouviGruppo = async (e) => {
    if (!newGroup) {
      setErrorMessage("Seleziona un gruppo da rimuovere");
      setShowPopup(true);
    }
    try {
      const groupId = groups.find((g) => g.nome === newGroup)._id;
      const response = await axios.post("http://localhost:8000/rimouviGruppo", {
        id: groupId,
      });
      if (response.status === 200) {
        setGroups(groups.filter((g) => g.nome !== newGroup));
      }
      setIsDeleteGroupModalOpen(false);
      setNewGroup("");
      setErrorMessage("Gruppo rimosso con successo");
      setShowPopup(true);
    } catch (error) {
      setErrorMessage("Compila tutti i campi");
      setShowPopup(true);
    }
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
    <div className="PageGA">
      {/* Colonna sinistra: Elenco dei gruppi */}
      <div className="column">
        <h2>GRUPPI</h2>
        <ul className="list">
          {groups.map((group) => {
            const groupId = group._id || group.id;
            return (
              <li className="barattolo" key={groupId}>
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
        materie={materie}
        selectedGroup={selectedGroup} // Filtra in base al gruppo
        handleMateriaClick={handleMateriaClick}
        selectedMateria={selectedMateria}
      />


      {/* Colonna destra: Dettagli (ad esempio della materia selezionata) */}
      <div className="column">
        <h2>INFO GRUPPO</h2>
        {selectedGroup ? (
          (() => {
            const groupInfo = groups.find((g) => g._id === selectedGroup || g.id === selectedGroup);
            return groupInfo ? (
              <>
                <p>Nome: {groupInfo.nome}</p>
                <p>Descrizione: {groupInfo.descrizione || "Nessuna descrizione disponibile"}</p>
              </>
            ) : (
              <p>Errore nel recupero del gruppo</p>
            );
          })()
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

      {/* Popup menu strutturato come un modale */}
      {isMenuOpen && (
        <div className={`modal ${isMenuOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span className="close-button" onClick={() => setIsMenuOpen(false)}>
              ×
            </span>
            <h2>Opzioni</h2>
            <button className="GA"
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Inserisci Gruppo
            </button>
            <button className="GA"
              onClick={() => {
                setIsAddMateriaModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Aggiungi Materia
            </button>
            <button className="GA"
              onClick={() => {
                setIsDeleteGroupModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              Elimina Gruppo
            </button>
          </div>
        </div>
      )}


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

      {isDeleteGroupModalOpen && (
        <div className={`modal ${isDeleteGroupModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsDeleteGroupModalOpen(false)}
            >
              ×
            </span>
            <h2>Rimuovi un gruppo</h2>
            <label>Gruppi:</label>
            <select
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
            >
              <option value="">Seleziona gruppo</option>
              {groups.map((m, index) => (
                <option key={index} value={m.nome}>
                  {m.nome}
                </option>
              ))}
            </select>

            <button className="add-button" onClick={handleRimouviGruppo}>
              Elimina Gruppo
            </button>
          </div>
        </div>
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

export default GruppiPage;
