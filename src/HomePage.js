import React, { useEffect, useState, useRef } from "react";
import "./Style.css";
import AppuntiList from "./AppuntiList";
import GruppiList from "./GruppiList";
import ProfiloWidget from "./ProfiloWidget";
import { useAuth } from "./Autenticato";
import axios from "axios";

function HomePage() {
  const { id } = useAuth();

  // Stati principali
  const [clickBoxes, setClickBoxes] = useState([]);
  const [username, setUsername] = useState("Utente123");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const containerRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Stati per gruppi e materie
  const [groups, setGroups] = useState([]); // Elenco dei gruppi
  const [temp, setTemp] = useState([]); // Array di ID delle materie (estratti dai gruppi)
  const [materie, setMaterie] = useState([]); // Elenco completo delle materie con i loro dettagli
  const [materiaGroupMap, setMateriaGroupMap] = useState({}); // Mappa: materiaId -> gruppoId

  // Stati per AppuntiList e GruppiList
  const [expandedMaterie, setExpandedMaterie] = useState(["Matematica", "Fisica"]);
  const [expandedGroups, setExpandedGroups] = useState([]); // Gruppi espansi per GruppiList
  const [selectedMateria, setSelectedMateria] = useState(null);

  // Gestione del cambio file (anteprima immagine)
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      console.log("Foto caricata:", file);
    }
  };

  // Fetch dell'username
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getusernamebyid", {
          params: { id: id },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Errore nel recupero dell'username:", error);
      }
    };
    fetchUsername();
  }, [id]);

  // Fetch dei gruppi
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
      const groupData = response.data;
      
      // Costruisci una mappa per associare ogni materia all'ID del gruppo
      const materiaGroupMapTemp = {};
      // Estrai gli ID delle materie da ciascun gruppo
      const materieData = groupData.flatMap((group) => {
        if (group.materie && Array.isArray(group.materie)) {
          group.materie.forEach((mId) => {
            materiaGroupMapTemp[mId] = group._id;
          });
          return group.materie;
        }
        return [];
      });
      
      setTemp(materieData);
      setMateriaGroupMap(materiaGroupMapTemp);
      
      // Costruisci la lista dei gruppi da passare a GruppiList
      const groupList = groupData.map((group) => ({
        nome: group.nome,
        id: group._id,
        // Se esiste una "materia principale" la puoi passare (qui è undefined se non presente)
        materia: group.materia,
        // Puoi anche includere il campo "materie" se lo desideri:
        materie: group.materie,
      }));
      setGroups(groupList);
    } catch (error) {
      console.error("Errore nel recupero dei gruppi:", error);
    }
  };

  // Fetch delle materie (una volta che "temp" è popolato)
  useEffect(() => {
    if (temp.length > 0) {
      fetchMateria();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temp]);

  const fetchMateria = async () => {
    try {
      const a = [];
      for (let i = 0; i < temp.length; i++) {
        const response = await axios.get("http://localhost:3000/getmateria", {
          params: { id: temp[i] },
        });
        // Attacca il gruppo usando la mappa (se disponibile)
        a.push({
          ...response.data,
          gruppo: materiaGroupMap[temp[i]], // Qui si attacca l'ID del gruppo
        });
      }
      const materieWithAppunti = await getMaterieWithAppunti(a);
      setMaterie(materieWithAppunti);
    } catch (error) {
      console.error("Errore nel recupero delle materie:", error);
    }
  };

  const getMaterieWithAppunti = async (materieArray) => {
    return await Promise.all(
      materieArray.map(async (materia) => {
        const appunti = await Promise.all(
          materia.appunti.map(async (appuntoId) => {
            const response = await axios.get("http://localhost:3000/getappuntibyid", {
              params: { id: appuntoId },
            });
            return {
              titolo: response.data.titolo,
              commento: response.data.commento,
              autore: response.data.autore.username,
              dataCreazione: new Date(response.data.dataCreazione).toLocaleDateString(),
              id: appuntoId,
            };
          })
        );
        return { 
          nome: materia.nome, 
          id: materia._id,
          gruppo: materia.gruppo, // Assicurati che questo campo sia valorizzato
          appunti: appunti 
        };
      })
    );
  };

  // Gestori degli eventi per AppuntiList e GruppiList
  const handleAppuntoClick = (appunto) => {
    console.log("Appunto clicked:", appunto);
    // Logica per la selezione di un appunto, se necessaria
  };

  const handleGruppiClick = (gruppo) => {
    const groupId = gruppo._id || gruppo.id;
    if (expandedGroups.includes(groupId)) {
      setExpandedGroups(expandedGroups.filter((id) => id !== groupId));
    } else {
      setExpandedGroups([...expandedGroups, groupId]);
    }
  };

  const handleMateriaClick = (materia) => {
    setSelectedMateria(materia);
    console.log("Materia selezionata:", materia);
  };

  // Altri useEffect per localStorage e gestione del resize/touch
  useEffect(() => {
    const storedBoxes = JSON.parse(localStorage.getItem("clickBoxes")) || [];
    setClickBoxes(storedBoxes);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const container = containerRef.current;
      let startX = 0;
      const handleTouchStart = (e) => {
        startX = e.touches[0].clientX;
      };
      const handleTouchMove = (e) => {
        const diffX = startX - e.touches[0].clientX;
        container.scrollLeft += diffX;
        startX = e.touches[0].clientX;
      };
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove);
      return () => {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      };
    }
  }, [isMobile]);

  return (
    <div className="homepage">
      <div className="columns" ref={containerRef}>
        {/* Colonna sinistra: Profilo e Appunti */}
        <div className="column" id="sinistra">
          <div className="neutral-zone">
          <ProfiloWidget
              imagePreview={imagePreview}
              handleFileChange={handleFileChange}
              username={username}
            />
          </div>
          <AppuntiList
            expandedMaterie={expandedMaterie}
            materie={materie}
            handleAppuntoClick={handleAppuntoClick}
            recent={true}
          />
        </div>
        {/* Colonna destra: Gruppi e Materie */}
        <div className="column" id="destra">
          <GruppiList
            groups={groups}
            materie={materie}
            expandedGroups={expandedGroups}
            handleGruppiClick={handleGruppiClick}
            handleMateriaClick={handleMateriaClick}
            selectedMateria={selectedMateria}
          />
        </div>
      </div>
    </div>
  );
}

function ClickBoxContainer({ clickBoxes }) {
  return (
    <div className="click-box-container">
      {clickBoxes.map((box, index) => (
        <div className="box clickable" key={index}>
          {box.title}
        </div>
      ))}
    </div>
  );
}

export default HomePage;
