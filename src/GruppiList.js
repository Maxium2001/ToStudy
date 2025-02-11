// Esempio di GruppiList (versione semplificata)
import React from "react";

const GruppiList = ({ groups, materie, expandedGroups, handleGruppiClick, handleMateriaClick, selectedMateria }) => {
  if (!Array.isArray(groups)) {
    return <p>Loading groups...</p>;
  }
  
  return (
    <div className="column centrale">
      <h2>GRUPPI</h2>
      <div className="list">
        {groups.length > 0 ? (
          groups.map((group) => {
            const groupId = group._id || group.id;
            return (
              <div key={groupId} className="barattolo">
                <div className="gruppo" onClick={() => handleGruppiClick(group)}>
                  <h5>{group.nome}</h5>
                  <p>{group.materia}</p>
                </div>
                {expandedGroups.includes(groupId) && (
                  <ul className="sottocategoria">
                    {materie
                      .filter((m) => m.gruppo === groupId)
                      .map((materia) => {
                        const materiaId = materia._id || materia.id;
                        return (
                          <li
                            key={materiaId}
                            onClick={() => handleMateriaClick(materia)}
                            className={selectedMateria && ((selectedMateria._id || selectedMateria.id) === materiaId) ? "selected" : ""}
                          >
                            {materia.titolo || materia.nome || "Materia non disponibile"}
                          </li>
                        );
                      })}
                  </ul>
                )}
              </div>
            );
          })
        ) : (
          <p>Non ci sono gruppi disponibili.</p>
        )}
      </div>
    </div>
  );
};

export default GruppiList;
