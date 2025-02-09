import React from "react";
import { NavLink } from "react-router-dom";
import "./Style.css";
import { useAuth } from "./Autenticato";

function NavBar() {
  const { isAuthenticated } = useAuth();
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
              <NavLink to="/faq" activeClassName="active">
                Faq
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-user">
        <NavLink to="/profilo">
          <img src="/user.png" alt="user" id="user" />
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
