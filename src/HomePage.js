import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Style.css';

function HomePage() {
  const [clickBoxes, setClickBoxes] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const containerRef = useRef(null);

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
  }, []);
  
return (
    <div className="homepage">
      <div className="columns" ref={containerRef}>
        {/* Colonna SINISTRA (ora con id="sinistra") */}
        <div className="column" id="sinistra">
          <div className="neutral-zone">
            <h1>PROFILO</h1> 
          </div>
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
