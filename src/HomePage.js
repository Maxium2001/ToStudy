


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
  }, [isMobile]);

  return (
    <div className="homepage">
      {isMobile ? (
        <div className="mobile-view" ref={containerRef}>
          <div className="column">
            <h1>PROFILO</h1>
          </div>
          <div className="column">
            <h1>APPUNTI</h1>
            <ClickBoxContainer clickBoxes={clickBoxes} />
          </div>
          <div className="column">
            <h1>GRUPPI</h1>
            <ClickBoxContainer clickBoxes={clickBoxes} />
          </div>
        </div>
      ) : (
        <div className="columns" ref={containerRef}>
          <div className="column" id="destra">
            <div className="neutral-zone bottom">
              <h1>PROFILO</h1> 
            </div>
            <div>
              <h1>APPUNTI</h1> 
              <ClickBoxContainer clickBoxes={clickBoxes} />
            </div>
          </div>
          <div className="column">
            <h1>GRUPPI</h1> 
            <ClickBoxContainer clickBoxes={clickBoxes} />
          </div>
        </div>
      )}
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