const GruppiList = ({ materie, selectedGroup, handleMateriaClick, selectedMateria, showAllMaterie = false }) => {
  // Se siamo in modalità "mostra tutto", visualizziamo tutte le materie
  const materieFiltrate = showAllMaterie ? materie : materie.filter((m) => m.gruppo === selectedGroup);

  return (
    <div className="column centrale">
      <h2>MATERIE</h2>
      {(!showAllMaterie && !selectedGroup) ? (
        <p>Seleziona un gruppo per visualizzare le materie.</p>
      ) : (
        <div className="list">
          {materieFiltrate.length > 0 ? (
            materieFiltrate.map((materia) => {
              const materiaId = materia._id || materia.id;
              return (
                <div key={materiaId} className="barattolo">
                  <div
                    id="materia"
                    className={`materia ${selectedMateria && ((selectedMateria._id || selectedMateria.id) === materiaId) ? "selected" : ""}`}
                    onClick={() => handleMateriaClick(materia)}
                  >
                    <h5>{materia.titolo || materia.nome || "Materia non disponibile"}</h5>
                  </div>
                </div>
              );
            })
          ) : (
            <p>Non ci sono materie disponibili.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GruppiList;