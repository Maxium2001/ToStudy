import React, { useEffect, useState } from 'react';
import './Style.css';
import './Function.css';

function HomePage() {
  const [clickBoxes, setClickBoxes] = useState([]);

  useEffect(() => {
    // Carica le click box dalla memoria locale
    const storedBoxes = JSON.parse(localStorage.getItem('clickBoxes')) || [];
    setClickBoxes(storedBoxes);
  }, []);

    return (
        <div className="homepage">
            <div className="column">
            <h2>PROFILO</h2> 
                <div className="neutral-zone"></div>
                <a href="ProfiloPage.js" className="circle-icon clickable"></a>
                <hr className="separator" />
                <h2>APPUNTI</h2> 
                {/* Colonna Scrollabile: Questo div è scrollabile se il contenuto è più grande */}
                <div class="click-box-container" id="clickBoxesContainer1">
                   {clickBoxes.map((box, index) => (
               <div className="box clickable" key={index}>
                   {box.title}
              </div>
                 ))}
             </div>
          </div>
            <div className="column">
            <h2>GRUPPI</h2> 
            <div class="click-box-container" id="clickBoxesContainer1">
                   {clickBoxes.map((box, index) => (
               <div className="box clickable" key={index}>
                   {box.title}
              </div>
                    ))}
                </div>
            </div>
            <div className="column">
            <h2>SCHEDA DI OGGI</h2> 
            <div class="click-box-container" id="clickBoxesContainer1">
                   {clickBoxes.map((box, index) => (
               <div className="box clickable" key={index}>
                   {box.title}
              </div>
                 ))}
            </div>
        </div>
    </div>
    );
}

export default HomePage;

