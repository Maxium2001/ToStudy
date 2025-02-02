import React, { useEffect } from 'react';

const AppuntiPage = () => {
    useEffect(() => {
        const form = document.getElementById('addBoxForm');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('boxTitle').value;

            // Recupera le click box già salvate (se ce ne sono)
            let boxes = JSON.parse(localStorage.getItem('clickBoxes')) || [];

            // Aggiungi la nuova click box
            boxes.push({ title });

            // Salva di nuovo le click box
            localStorage.setItem('clickBoxes', JSON.stringify(boxes));

            // Reset del form
            document.getElementById('boxTitle').value = '';
            alert('Click Box aggiunta con successo!');
            });
        },[]);
    
            const clearClickBoxes = () => {
                // Rimuove le click box dalla memoria locale
                localStorage.removeItem('clickBoxes');
                // Puoi aggiungere altre azioni, come redirigere l'utente o aggiornare la UI
                window.location.reload(); // Ricarica la pagina per applicare i cambiamenti
            };
      

        return (
            <div lang="it" style={{ marginTop: '50px' }}>
                <head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=5.0" />
                    <title>Aggiungere Click Box</title>
                </head>
                <body>
                    <h1>Aggiungi Click Box</h1>
                    <form id="addBoxForm">
                        <label htmlFor="boxTitle">Titolo della Click Box:</label>
                        <input type="text" id="boxTitle" required />
                        <button type="submit">Aggiungi</button>
                    </form>
                    <div className="clearclickboxes">
                        <button onClick={clearClickBoxes}>Cancella Click Boxes</button>
                    </div>
                </body>
            </div>
        );
    };

export default AppuntiPage;