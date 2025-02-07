import React from "react";
import "./Style.css"; // Import del file CSS

const AppuntiPage = () => {
    return (
        <div className="AppuntiPage">
            {/* Prima colonna - Materia */}
            <div className="columnA">
                <h2>Materie</h2>
            </div>

            {/* Seconda colonna - Appunti */}
            <div className="columnA centrale">
                <h2>Appunti</h2>
                <p>Elenco dei gruppi disponibili...</p>
            </div>

            {/* Terza colonna - Nome Utente */}
            <div className="columnA">
                <h2>Chi</h2>
                <p>Giuseppe Rossi</p>
                <h2>Commenti</h2>
            </div>
        </div>
    );
};

export default AppuntiPage;
