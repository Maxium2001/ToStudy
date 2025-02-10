import React, { useState, useEffect } from "react";
import "./Style.css";
import AppuntiList from "./AppuntiList";
import axios from "axios";
import { useAuth } from "./Autenticato";

const AppuntiPage = () => {
  const { id } = useAuth();
  // Stato per gestire le materie espanse
  const [expandedMaterie, setExpandedMaterie] = useState([]);
  // Stato per gestire l'appunto selezionato
  const [selectedAppunto, setSelectedAppunto] = useState(null);
  // Stato per gestire l'apertura del modale per aggiungere appunti
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Stato per gestire l'apertura del modale per aggiungere materie
  const [isAddMateriaModalOpen, setIsAddMateriaModalOpen] = useState(false);
  const [isDeleteMateriaModalOpen, setIsDeleteMateriaModalOpen] =
    useState(false);
  const [isDeleteAppuntoModalOpen, setIsDeleteAppuntoModalOpen] =
    useState(false);
  // Stato per gestire l'apertura del menu popup
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Stato per gestire il nome della nuova materia
  const [newMateria, setNewMateria] = useState("");
  // Stato per gestire il titolo del nuovo appunto
  const [newTitle, setNewTitle] = useState("");
  // Stato per gestire il file caricato
  const [uploadedFile, setUploadedFile] = useState(null);
  // Stato per gestire il commento del nuovo appunto
  const [newComment, setNewComment] = useState("");
  const [newGroup, setNewGroup] = useState("");

  const [temp, setTemp] = useState([]);

  const [groups, setGroups] = useState([]);

  // Stato per gestire le materie e i relativi appunti
  const [materie, setMaterie] = useState([
    {
      nome: String,
      id: String,
      appunti: [
        {
          titolo: String,
          commento: String,
          autore: String,
          dataCreazione: Date,
          id: String,
        },
      ],
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchGroups();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (temp.length > 0) {
      fetchMateria();
    }
  }, [temp]);

  const fetchGroups = async () => {
    try {
      const response = await axios.get("http://localhost:3000/getusergroups", {
        params: { id: id },
      });
      const groupData = response.data;
      const materieData = groupData.flatMap((group) => group.materie);
      setTemp(materieData);
      const groupList = groupData.map((group) => ({
        nome: group.nome,
        id: group._id,
      }));
      setGroups(groupList);
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

  const fetchMateria = async () => {
    try {
      const a = [];
      for (let i = 0; i < temp.length; i++) {
        const response = await axios.get("http://localhost:3000/getmateria", {
          params: { id: temp[i] },
        });

        a.push(response.data);
      }
      const materieWithAppunti = await getMaterieWithAppunti(a);
      setMaterie(materieWithAppunti);
    } catch (error) {
      console.error("Errore nel recupero delle materie:", error);
    }
  };
  const getMaterieWithAppunti = async (materie) => {
    return await Promise.all(
      materie.map(async (materia) => {
        const appunti = await Promise.all(
          materia.appunti.map(async (appuntoId) => {
            const response = await axios.get(
              "http://localhost:3000/getappuntibyid",
              {
                params: { id: appuntoId },
              }
            );

            return {
              titolo: response.data.titolo,
              commento: response.data.commento,
              autore: response.data.autore.username,
              dataCreazione: new Date(
                response.data.dataCreazione
              ).toLocaleDateString(),
              id: appuntoId,
            };
          })
        );
        return { nome: materia.nome, id: materia._id, appunti: appunti };
      })
    );
  };

  // Funzione per gestire il click su una materia
  const handleMateriaClick = (materiaNome) => {
    setExpandedMaterie((prevExpandedMaterie) =>
      prevExpandedMaterie.includes(materiaNome)
        ? prevExpandedMaterie.filter((nome) => nome !== materiaNome)
        : [...prevExpandedMaterie, materiaNome]
    );
  };

  // Funzione per gestire il caricamento di un file
  const handleFileUpload = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  // Funzione per gestire il click su un appunto
  const handleAppuntoClick = (appunto) => {
    setSelectedAppunto(appunto);
    console.log(appunto);
  };

  // Funzione per aggiungere un nuovo appunto
  const handleAddAppunto = async (e) => {
    if (newMateria && newTitle && uploadedFile && newComment) {
      const newAppunto = {
        titolo: newTitle,
        commento: newComment,
        autore: id,
      };
      const materiaId = materie.find((m) => m.nome === newMateria).id;

      try {
        const formData = new FormData();
        formData.append("titolo", newTitle);
        formData.append("commento", newComment);
        formData.append("file", uploadedFile);
        formData.append("autore", id);
        formData.append("materia", materiaId);
        await axios.post("http://localhost:3000/creaappunti", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (error) {
        console.error("Errore nell'aggiunta dell'appunto:", error);
        alert("Errore nell'aggiunta dell'appunto");
      }
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

  // Funzione per aggiungere una nuova materia
  const handleAddMateria = () => {
    if (newMateria) {
      setMaterie((prevMaterie) => [
        ...prevMaterie,
        { nome: newMateria, appunti: [] },
      ]);
      const groupId = groups.find((group) => group.nome === newGroup).id;
      try {
        axios.post("http://localhost:3000/creamateria", {
          nome: newMateria,
          autore: id,
          gruppo: groupId,
        });
      } catch (error) {
        console.error("Errore nell'aggiunta della materia:", error);
        alert("Errore nell'aggiunta della materia");
      }
      alert(`Materia "${newMateria}" aggiunta`);
      setIsAddMateriaModalOpen(false);
      setNewMateria("");
    } else {
      alert("Inserisci un nome per la materia!");
    }
  };

  const handleDownload = async (appunto) => {
    try {
      const response = await axios.get("http://localhost:3000/getappunti", {
        params: { id: appunto.id },
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${appunto.titolo}.${response.data.type.split("/")[1]}`
      ); // Imposta il nome del file
      document.body.appendChild(link);
      alert("Appunto scaricato con successo");
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Errore nel download dell'appunto:", error);
      alert("Errore nel download dell'appunto");
    }
  };

  const handleRimouviMateria = async () => {
    try {
      const materiaId = materie.find((m) => m.nome === newMateria).id;
      await axios.post("http://localhost:3000/rimuovimateria", {
        id: materiaId,
      });
      setMaterie((prevMaterie) =>
        prevMaterie.filter((materia) => materia.nome !== newMateria)
      );
      alert(`Materia "${newMateria}" rimossa`);
      setIsDeleteMateriaModalOpen(false);
      setNewMateria("");
    } catch (error) {
      console.error("Errore nella rimozione della materia:", error);
      alert("Errore nella rimozione della materia");
    }
  };

  const handleRimouviAppunti = async () => {
    try {
      const appuntoId = materie
        .flatMap((m) => m.appunti)
        .find((a) => a.titolo === newTitle).id;
      console.log(appuntoId);
      await axios.post("http://localhost:3000/rimuoviappunti", {
        id: appuntoId,
      });
      setMaterie((prevMaterie) =>
        prevMaterie.map((materia) => ({
          ...materia,
          appunti: materia.appunti.filter(
            (appunto) => appunto.titolo !== newTitle
          ),
        }))
      );
      alert(`Appunto "${newTitle}" rimosso`);
      setIsDeleteAppuntoModalOpen(false);
      setNewTitle("");
    } catch (error) {
      console.error("Errore nella rimozione dell'appunto:", error);
    }
  };

  // Funzione per aprire/chiudere il popup menu
  const togglePopup = () => {
    setIsMenuOpen(!isMenuOpen);
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
                <span>
                  {expandedMaterie.includes(materia.nome) ? "▼" : "▶"}
                </span>
              </div>
              {expandedMaterie.includes(materia.nome) && (
                <ul className="sottocategoria">
                  {materia.appunti.map((appunto, i) => (
                    <li
                      key={i}
                      onClick={() => handleAppuntoClick(appunto)}
                      className={selectedAppunto === appunto ? "selected" : ""}
                    >
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
      <AppuntiList
        expandedMaterie={expandedMaterie}
        materie={materie}
        handleAppuntoClick={handleAppuntoClick}
      />

      {/* Colonna destra - Dettagli */}
      <div className="columnA">
        <h2>Info Appunto</h2>
        {selectedAppunto ? (
          <>
            <p>Autore: {selectedAppunto.autore}</p>
            <p>Data di creazione: {selectedAppunto.dataCreazione}</p>
            <h3>Commento</h3>
            <p>{selectedAppunto.commento}</p>
            <button onClick={() => handleDownload(selectedAppunto)}>
              Scarica Appunto
            </button>
          </>
        ) : (
          <p>Seleziona un appunto per visualizzare i dettagli</p>
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
            <button
              onClick={() => {
                setIsDeleteMateriaModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              elimina Materia
            </button>
            <button
              onClick={() => {
                setIsDeleteAppuntoModalOpen(true);
                setIsMenuOpen(false);
              }}
            >
              elimina Appunto
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

      {isDeleteMateriaModalOpen && (
        <div className={`modal ${isDeleteMateriaModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsDeleteMateriaModalOpen(false)}
            >
              ×
            </span>
            <h2>Rimuovi una materia</h2>
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

            <button className="add-button" onClick={handleRimouviMateria}>
              elimina Materia
            </button>
          </div>
        </div>
      )}

      {isDeleteAppuntoModalOpen && (
        <div className={`modal ${isDeleteAppuntoModalOpen ? "open" : ""}`}>
          <div className="modal-content">
            <span
              className="close-button"
              onClick={() => setIsDeleteAppuntoModalOpen(false)}
            >
              ×
            </span>
            <h2>Rimuovi un Appunto</h2>
            <label>Appunti:</label>
            <select
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            >
              <option value="">Seleziona appunto</option>
              {materie
                .flatMap((m) => m.appunti)
                .map((a, index) => (
                  <option key={index} value={a.titolo}>
                    {a.titolo}
                  </option>
                ))}
            </select>

            <button className="add-button" onClick={handleRimouviAppunti}>
              elimina Materia
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
                <option key={index} value={group.nome}>
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

export default AppuntiPage;
