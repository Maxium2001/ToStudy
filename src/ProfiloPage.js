import React from 'react';
import './Style.css';
import { Link } from 'react-router-dom'; // Correct import for Link

const ProfiloPage = () => {
    const showMessage = () => {
        alert('Hello, this is a big message!');
    };

    return (
        <div>
            <h1>ProfiloPage</h1>
            {/* Contenuto della pagina */}
            <button onClick={showMessage}>Show Message</button>
        </div>
    );
};

export default ProfiloPage;