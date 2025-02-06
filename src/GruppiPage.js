import React from "react";
import "./Style.css"; // Import del file CSS

const GruppiPage = () => {
    return (
        <div className="GruppiPage">
            {/* Prima colonna - Materia */}
            <div className="columnG">
                <h2>Materia</h2>
                <ul>
                    <li>Matematica</li>
                    <li>Fisica</li>
                    <li>Storia</li>
                    <li>Informatica</li>
                </ul>
            </div>

            {/* Seconda colonna - Gruppi */}
            <div className="columnG centrale">
                <h2>Gruppi</h2>
                <p>Elenco dei gruppi disponibili...</p>
            </div>

            {/* Terza colonna - Nome Utente */}
            <div className="columnG">
                <h2>Nome Utente</h2>
                <p>Giuseppe Rossi</p>
            </div>
        </div>
    );
};

export default GruppiPage;
