import React, { useState } from 'react';
import "./Style.css";

const FaqPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the FAQ
    };

    return (

        <div id='FaqPage'>
            <h1>Domande Frequenti</h1>
            <div className="Selettore">
                <div id="Titolo-container">
                    <button className="Titolo" onClick={() => handleClick(0)}>
                        Come posso caricare i miei appunti sul sito?
                        <span className={`arrow ${openIndex === 0 ? 'open' : ''}`}>&#9662;</span>
                    </button>
                    {openIndex === 0 && (
                        <div className="answer">
                            <p>Per caricare i tuoi appunti, cliccare il bottone in basso a destra "+". Si aprirà un menu che mostra le opzioni. Cliccando "Inserisci Appunto" si potrà caricare l'appunto compilando tutti i campi presenti.</p>
                        </div>
                    )}
                    <button className="Titolo" onClick={() => handleClick(1)}>
                        Come posso creare un gruppo?
                        <span className={`arrow ${openIndex === 1 ? 'open' : ''}`}>&#9662;</span>
                    </button>
                    {openIndex === 1 && (
                        <div className="answer">
                            <p>Per creare un gruppo,cliccare il bottone in basso a destra "+". Si aprirà un menu che mostra le opzioni. Cliccando "Inserisci Gruppo" si potrà creare il gruppo compilando tutti i campi presenti.</p>
                        </div>
                    )}
                    <button className="Titolo" onClick={() => handleClick(2)}>
                        Come posso mofificare l'immagine del mio profilo profilo?
                        <span className={`arrow ${openIndex === 2 ? 'open' : ''}`}>&#9662;</span>
                    </button>
                    {openIndex === 2 && (
                        <div className="answer">
                            <p>Per modificare il profilo, clicca sull' icona in alto a destra per accedere alla schermata del profilo. Cliccando sull'immagine potrai caricare l'immagine.</p>
                        </div>
                    )}
                    <button className="Titolo" onClick={() => handleClick(3)}>
                        Come posso eliminare un appunto o una materia?
                        <span className={`arrow ${openIndex === 3 ? 'open' : ''}`}>&#9662;</span>
                    </button>
                    {openIndex === 3 && (
                        <div className="answer">
                            <p>Per eliminare un appunto o una materia ,cliccare il bottone in basso a destra "+". Si aprirà un menu che mostra le opzioni. Cliccando "Elimina Materia" o "Elimina Appunto", si aprirà un menù che permette di selezionare l'appunto o la materia da eliminare.</p>
                        </div>
                    )}
                    <button className="Titolo" onClick={() => handleClick(4)}>
                        Come posso modificare i dati del mio account?
                        <span className={`arrow ${openIndex === 4 ? 'open' : ''}`}>&#9662;</span>
                    </button>
                    {openIndex === 4 && (
                        <div className="answer">
                            <p>Per modificare i dati dell'account bisogna andare nella pagina profilo mediante il bottone in alto a destra. Cliccando "Dettagli Profilo" si potranno visualizzare i propri dati, che potranno essere cambiati e salvati tramite il bottone "Aggiungi".</p>
                        </div>
                    )}
                    <button className="Titolo" onClick={() => handleClick(5)}>
                        Come posso modificare la mia password?
                        <span className={`arrow ${openIndex === 5 ? 'open' : ''}`}>&#9662;</span>
                    </button>
                    {openIndex === 5 && (
                        <div className="answer">
                            <p>Per modificare la password bisogna accedere all'account tramite il bottone in alto a destra. Cliccando "Modifica Password" si potrà cambiare la password corrente.</p>
                        </div>
                    )}
                    <button className="Titolo" onClick={() => handleClick(6)}>
                        Cosa fare se dimentico la mia password?
                        <span className={`arrow ${openIndex === 6 ? 'open' : ''}`}>&#9662;</span>
                    </button>
                    {openIndex === 6 && (
                        <div className="answer">
                            <p>Se hai dimenticato la tua password, clicca su "Hai dimenticato la password?" nella pagina di login seguendo le istruzioni.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaqPage;
