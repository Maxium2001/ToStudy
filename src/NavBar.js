import React from "react";
import { NavLink } from "react-router-dom";
import "./Style.css";
import { useProfileImage } from "./ProfileImageContext";

function NavBar() {
  const { profileImage } = useProfileImage();

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-brand">
          <NavLink to="/homepage">
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
          <div className="foto-navbar">
            {" "}
            <img src={profileImage} alt="user" id="user" />
          </div>
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
