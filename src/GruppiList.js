import React from 'react';

const GruppiList = ({ expandedMaterie, materie, handleGruppiClick }) => {
  return (
    <div className="columnG centrale">
      <h2>Gruppi</h2>
      <div className="gruppi-list">
        {expandedMaterie.length > 0 ? (
          expandedMaterie.map((materiaNome) => {
            const materia = materie.find((m) => m.nome === materiaNome);
            if (!materia || !materia.gruppi) {
              return null;
            }
            return (
              <div key={materiaNome}>
                <h3>{materia.nome}</h3>
                <div className="gruppi-list">
                  {materia.gruppi.map((gruppo, index) => (
                    <div
                      key={index}
                      className="gruppo-box"
                      onClick={() => handleGruppiClick(gruppo)}
                    >
                      <h4>{gruppo.titolo}</h4>
                      <p>{gruppo.autore}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <p>Seleziona una materia per visualizzare i gruppi</p>
        )}
      </div>
    </div>
  );
};

export default GruppiList;