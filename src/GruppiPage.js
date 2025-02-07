import React, { useEffect, useState } from "react";
import "./Style.css"; // Import del file CSS
import { NavLink } from "react-router-dom";
import { useAuth } from "./Autenticato";
import axios from "axios";

const GruppiPage = () => {
  const { isAuthenticated, id } = useAuth();
  const [gruppi, setGruppi] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const response = await axios.get(
            "http://localhost:3000/getusergroups",
            {
              params: { id: id },
            }
          );
          console.log(response);
          if (response.status === 200) {
            setGruppi(response.data);
          }
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.message);
            // Il server ha risposto con uno stato diverso da 2xx
          } else if (error.request) {
            console.log(error.request.message);
            // La richiesta è stata fatta ma non è stata ricevuta alcuna risposta
          } else {
            console.log(error.message);
            // Qualcosa è andato storto nella configurazione della richiesta
          }
        }
      }
    };

    fetchData();
  }, [isAuthenticated, id]);
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
