import React, { useState } from 'react';
import "./Style.css";

const FaqPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleClick = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the FAQ
    };

    return (
        <div className="faq-container">
            <h1>Domande Frequenti</h1>
            <div id="faq">
                <button className="faq-question" onClick={() => handleClick(0)}>
                    Come posso caricare i miei appunti sul sito?
                    <span className={`faq-arrow ${openIndex === 0 ? 'open' : ''}`}>&#9662;</span>
                </button>
                {openIndex === 0 && (
                    <div className="faq-answer">
                        <p>Per caricare i tuoi appunti, accedi al tuo account e vai alla sezione "Carica Appunti". Clicca su "Carica Nuovo File", seleziona il documento che desideri condividere e aggiungi una descrizione breve per facilitare la ricerca. I tuoi appunti saranno visibili a tutti gli utenti o solo ai membri dei gruppi di studio che hai selezionato.</p>
                    </div>
                )}
                <button className="faq-question" onClick={() => handleClick(1)}>
                    Come posso creare un gruppo di studio?
                    <span className={`faq-arrow ${openIndex === 1 ? 'open' : ''}`}>&#9662;</span>
                </button>
                {openIndex === 1 && (
                    <div className="faq-answer">
                        <p>Per creare un gruppo di studio, vai alla sezione "Gruppi" e clicca su "Crea Nuovo Gruppo". Scegli un nome per il gruppo, una descrizione e invita i tuoi compagni di studio inserendo i loro indirizzi email o cercandoli tramite il loro nome utente. Una volta creato, potrai caricare e condividere appunti, discutere e pianificare le sessioni di studio.</p>
                    </div>
                )}
                <button className="faq-question" onClick={() => handleClick(2)}>
                    Come funziona il calendario delle cose da studiare?
                    <span className={`faq-arrow ${openIndex === 2 ? 'open' : ''}`}>&#9662;</span>
                </button>
                {openIndex === 2 && (
                    <div className="faq-answer">
                        <p>Il calendario ti permette di organizzare i tuoi impegni di studio. Puoi aggiungere le date di esami, scadenze e sessioni di studio, e creare eventi con promemoria. Puoi anche visualizzare il calendario condiviso con i membri del tuo gruppo di studio per tenere traccia degli eventi comuni.</p>
                    </div>
                )}
                <button className="faq-question" onClick={() => handleClick(3)}>
                    Come posso modificare o eliminare un appunto che ho caricato?
                    <span className={`faq-arrow ${openIndex === 3 ? 'open' : ''}`}>&#9662;</span>
                </button>
                {openIndex === 3 && (
                    <div className="faq-answer">
                        <p>Vai alla sezione "I miei appunti" e seleziona il file che desideri modificare. Avrai l'opzione di aggiornare la descrizione o caricare una nuova versione del documento. Se vuoi rimuovere l'appunto, clicca sull'opzione "Elimina" accanto al file.</p>
                    </div>
                )}
                <button className="faq-question" onClick={() => handleClick(4)}>
                    Posso partecipare a più gruppi di studio contemporaneamente?
                    <span className={`faq-arrow ${openIndex === 4 ? 'open' : ''}`}>&#9662;</span>
                </button>
                {openIndex === 4 && (
                    <div className="faq-answer">
                        <p>Assolutamente sì! Puoi far parte di più gruppi di studio contemporaneamente e passare facilmente da un gruppo all'altro. Ogni gruppo avrà una sua bacheca, un calendario e uno spazio per caricare appunti.</p>
                    </div>
                )}
                <button className="faq-question" onClick={() => handleClick(5)}>
                    Come posso cercare appunti specifici?
                    <span className={`faq-arrow ${openIndex === 5 ? 'open' : ''}`}>&#9662;</span>
                </button>
                {openIndex === 5 && (
                    <div className="faq-answer">
                        <p>Nella sezione di ricerca, puoi filtrare per materia, tipo di appunto, data di caricamento e autore. Se conosci il titolo o una parola chiave degli appunti che stai cercando, puoi inserire il termine nella barra di ricerca per trovarli rapidamente.</p>
                    </div>
                )}
                <button className="faq-question" onClick={() => handleClick(6)}>
                    Cosa fare se dimentico la mia password?
                    <span className={`faq-arrow ${openIndex === 6 ? 'open' : ''}`}>&#9662;</span>
                </button>
                {openIndex === 6 && (
                    <div className="faq-answer">
                        <p>Se hai dimenticato la tua password, clicca su "Hai dimenticato la password?" nella pagina di login. Ti invieremo un'email con le istruzioni per reimpostarla.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FaqPage;
