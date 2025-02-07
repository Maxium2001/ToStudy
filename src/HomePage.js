import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';
import AppuntiList from './AppuntiList';

const HomePage = () => {
  const [clickBoxes, setClickBoxes] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const containerRef = useRef(null);

  const [expandedMaterie, setExpandedMaterie] = useState(["Matematica", "Fisica"]);
  const [materie, setMaterie] = useState([
    {
      nome: "Matematica",
      appunti: [
        { titolo: "Algebra", commento: "Appunto su Algebra", autore: "Mario Rossi", dataCreazione: "01/01/2025" },
        { titolo: "Geometria", commento: "Appunto su Geometria", autore: "Luigi Bianchi", dataCreazione: "02/01/2025" },
      ],
    },
    {
      nome: "Fisica",
      appunti: [
        { titolo: "Meccanica", commento: "Appunto su Meccanica", autore: "Giulia Verdi", dataCreazione: "03/01/2025" },
        { titolo: "Ottica", commento: "Appunto su Ottica", autore: "Anna Neri", dataCreazione: "04/01/2025" },
      ],
    },
  ]);

  const handleAppuntoClick = (appunto) => {
    // Logica per gestire il click su un appunto
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
        {/* Colonna SINISTRA (ora con id="sinistra") */}
        <div className="column" id="sinistra">
          <div className="neutral-zone">
            <h1>PROFILO</h1> 
            <Link to="/profilo">Vai al Profilo</Link>
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