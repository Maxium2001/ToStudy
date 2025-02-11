import React from "react";

const AppuntiList = ({
  expandedMaterie,
  materie,
  handleAppuntoClick,
  recent,
}) => {
  const getRecentAppunti = (materie) => {
    const allAppunti = materie.flatMap((materia) => materia.appunti);
    return allAppunti
      .sort((a, b) => new Date(b.dataCreazione) - new Date(a.dataCreazione))
      .slice(0, 5);
  };

  const appuntiToShow = recent
    ? getRecentAppunti(materie)
    : expandedMaterie.flatMap((materiaNome) => {
        const materia = materie.find((m) => m.nome === materiaNome);
        return materia ? materia.appunti : [];
      });

  return (
    <div className="column centrale">
      <h2>APPUNTI</h2>
      <div className="list">
        {appuntiToShow.length > 0 ? (
          appuntiToShow.map((appunto, index) => (
            <div
              key={index}
              className="barattolo"
              onClick={() => handleAppuntoClick(appunto)}
            >
              <h5 className="titol">{appunto.titolo}</h5>
              <p>{appunto.commento}</p>
            </div>
            
          ))
        ) : (
          <p>Seleziona una materia per visualizzare gli appunti</p>
        )}
      </div>
    </div>
  );
};

export default AppuntiList;
