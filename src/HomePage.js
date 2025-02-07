import React, { useEffect, useState, useRef } from 'react';
import { NavLink } from "react-router-dom";
import './Style.css';

function HomePage() {
  const [clickBoxes, setClickBoxes] = useState([]);
  const [username, setUsername] = useState('Utente123');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const containerRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null); // Aggiungi lo stato per l'anteprima dell'immagine

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Prendi il file caricato
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Crea un URL temporaneo per il file
      setImagePreview(imageUrl); // Salva l'URL dell'immagine nel state
      console.log('Foto caricata:', file);
    }
  };

  useEffect(() => {
    const storedBoxes = JSON.parse(localStorage.getItem('clickBoxes')) || [];
    setClickBoxes(storedBoxes);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchmove', handleTouchMove);

      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
      };
    }
  }, [isMobile]);

  return (
    <div className="homepage">
      <div className="columns" ref={containerRef}>
        {/* Colonna SINISTRA */}
        <div className="column" id="sinistra">
          <div className="neutral-zone">
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
                src={imagePreview || 'default-image.jpg'} // Usa l'anteprima o un'immagine di default
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
          <div className="username">{username || 'Username'}</div>
        </div>
            </div>
          </div></div>
          <h1>APPUNTI</h1>
          <ClickBoxContainer clickBoxes={clickBoxes} />
        </div>

        {/* Colonna DESTRA */}
        <div className="column" id="destra">
          <h1>GRUPPI</h1>
          <ClickBoxContainer clickBoxes={clickBoxes} />
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