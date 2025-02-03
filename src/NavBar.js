import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Style.css";

function NavBar() {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav>
      <div className="navbar-brand">
        <NavLink to="/" className="icon-nav">
          <img src="/logo.png" alt="logo" />
        </NavLink>
      </div>

      {/* Icona hamburger per mobile */}
      <div className="hamburger" onClick={toggleMenu}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Navbar per desktop e mobile */}
      <div className={`navbar-nav ${isMobile ? "active" : ""}`}>
        <ul>
          <li>
            <NavLink exact to="/" activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/appunti" activeClassName="active">
              Appunti
            </NavLink>
          </li>
          <li>
            <NavLink to="/gruppi" activeClassName="active">
              Gruppo
            </NavLink>
          </li>
          <li>
            <NavLink to="/calendario" activeClassName="active">
              Calendario
            </NavLink>
          </li>
          <li>
            <NavLink to="/faq" activeClassName="active">
              Faq
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="navbar-user">
        <ul>
          <li>
            <NavLink to="/login" className="icon-nav">
              <img src="/user.png" alt="user" id="user" />
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
