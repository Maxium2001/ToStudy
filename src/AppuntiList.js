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
    <div className="columnA centrale">
      <h2>APPUNTI</h2>
      <div className="appunti-list">
        {appuntiToShow.length > 0 ? (
          appuntiToShow.map((appunto, index) => (
            <div
              key={index}
              className="appunto-box"
              onClick={() => handleAppuntoClick(appunto)}
            >
              <h4>{appunto.titolo}</h4>
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
