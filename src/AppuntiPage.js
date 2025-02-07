import React, { useState } from "react";
import "./Style.css";

const AppuntiPage = () => {
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [selectedAppunto, setSelectedAppunto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const materie = [
        { nome: "Matematica", appunti: ["Algebra", "Geometria"] },
        { nome: "Fisica", appunti: ["Meccanica", "Ottica"] },
    ];

    const handleMateriaClick = (materia) => {
        setSelectedMateria(selectedMateria === materia ? null : materia);
    };

    return (
        <div className="appunti-container">
            {/* Colonna sinistra - Materie */}
            <div className="column left">
                <h2>Materie</h2>
                <ul>
                    {materie.map((materia, index) => (
                        <li key={index}>
                            <div className="materia-title" onClick={() => handleMateriaClick(materia.nome)}>
                                {materia.nome} <span>{selectedMateria === materia.nome ? "▼" : "▶"}</span>
                            </div>
                            {selectedMateria === materia.nome && (
                                <ul className="sub-list">
                                    {materia.appunti.map((appunto, i) => (
                                        <li key={i} onClick={() => setSelectedAppunto(appunto)}>{appunto}</li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Colonna centrale - Appunti */}
            <div className="column center">
                <h2>Appunti</h2>
                {selectedMateria ? (
                    <div className="appunti-list">
                        {materie.find(m => m.nome === selectedMateria).appunti.map((appunto, index) => (
                            <div key={index} className="appunto-box" onClick={() => setSelectedAppunto(appunto)}>
                                <h3>{appunto}</h3>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Seleziona una materia</p>
                )}
            </div>

            {/* Colonna destra - Dettagli */}
            <div className="column right">
                <h2>Info Appunto</h2>
                {selectedAppunto ? (
                    <>
                        <p>Autore: Giuseppe Rossi</p>
                        <h3>Commenti</h3>
                        <p>Qui ci saranno i commenti...</p>
                    </>
                ) : (
                    <p>Seleziona un appunto</p>
                )}
            </div>

            {/* Pallino per il modale */}
            <button className="floating-button" onClick={() => setIsModalOpen(true)}>+</button>

            {/* Modale */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setIsModalOpen(false)}>×</span>
                        <h2>Nuovo Appunto</h2>
                        <p>Contenuto del modale...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppuntiPage;
