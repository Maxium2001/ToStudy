import React from "react";
import { NavLink } from "react-router-dom";
import "./Style.css";
import { useAuth } from "./Autenticato";
import { useEffect, useState } from "react";
import axios from "axios";

function NavBar() {
  const { id } = useAuth();
  const [image, setImage] = useState(null);
  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/geticon`, {
          params: { id: id },
          responseType: "blob",
        });
        const iconUrl = URL.createObjectURL(response.data);
        setImage(iconUrl);
        console.log("Icona caricata con successo");
      } catch (error) {
        console.error("Errore nel recupero dell'icona:", error);
      }
    };
    fetchIcon();
  }, [id]);
  return (
    <nav>
      <div className="navbar">
        <div className="navbar-brand">
          <NavLink to="/">
            <img src="/logo.png" alt="logo" id="logo" />
          </NavLink>
        </div>

        {/* Navbar per desktop */}
        <div className="navbar-nav">
          <ul>
            <li>
              <NavLink exact to="/homepage" activeClassName="active">
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/appunti" activeClassName="active">
                APPUNTI
              </NavLink>
            </li>
            <li>
              <NavLink to="/gruppi" activeClassName="active">
                GRUPPI
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" activeClassName="active">
                FAQ
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-user ">
        <NavLink to="/profilo">
         <div className="foto-navbar"> <img  src={image} alt="user" id="user" /></div>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
