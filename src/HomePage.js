import React, { useEffect, useState, useRef } from "react";
import "./Style.css";
import AppuntiList from "./AppuntiList";
import GruppiList from "./GruppiList";
import ProfiloWidget from "./ProfiloWidget";
import { useAuth } from "./Autenticato";
import axios from "axios";

function HomePage() {
  const { id } = useAuth();
  const [clickBoxes, setClickBoxes] = useState([]);
  const [username, setUsername] = useState("Utente123");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const containerRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null); // Aggiungi lo stato per l'anteprima dell'immagine
  const [groups, setGroups] = useState([]);
  const [temp, setTemp] = useState([]);

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/getuserbyid`, {
          params: { id: id },
        });
        setUsername(response.data.username);
      } catch (error) {
        console.error("Errore nel recupero dell'username:", error);
      }
    };
    fetchUsername();
  }, [id]);
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
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Prendi il file caricato
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crea un URL temporaneo per il file
      setImagePreview(imageUrl); // Salva l'URL dell'immagine nel state
      console.log("Foto caricata:", file);
    }
  };
  const [expandedMaterie, setExpandedMaterie] = useState([
    "Matematica",
    "Fisica",
  ]);
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

  const handleAppuntoClick = (appunto) => {
    // Logica per gestire il click su un appunto
  };
  const handleGruppiClick = (gruppo) => {
    // Logica per gestire il click su un gruppo
  };

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
            recent={true} // Passa la proprietà recent
          />
        </div>
        {/* Colonna DESTRA */}
        <div className="column" id="destra">
          <GruppiList
            expandedMaterie={expandedMaterie}
            materie={materie}
            handleGruppiClick={handleGruppiClick}
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
