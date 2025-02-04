import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

function HomePage() {
  const [clickBoxes, setClickBoxes] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const storedBoxes = JSON.parse(localStorage.getItem('clickBoxes')) || [];
    setClickBoxes(storedBoxes);
  }, []);

  // Funzione per gestire lo swipe
  useEffect(() => {
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
  }, []);

  return (
    <div className="homepage">
      {/* Zona neutra - visibile sopra le colonne su mobile */}
  
      <div className="scroll-container" ref={containerRef}>
        <div className="column">
          <h1>PROFILO</h1> 

          <h1>APPUNTI</h1> 
          <ClickBoxContainer clickBoxes={clickBoxes} />
        </div>
        <div className="column">
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


