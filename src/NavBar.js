<<<<<<< HEAD
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Style.css'; 

function NavBar() {
    return (
        <nav>
            <div className="navbar-brand">
                <NavLink to="/">
                    <img src="/logo.png" alt="Logo" />
                </NavLink>
            </div>
            <div className="navbar-nav">
                <ul>
                    <li>
                        <NavLink exact to="/" activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/appunti" activeClassName="active">Appunti</NavLink>
                    </li>
                    <li>
                        <NavLink to="/gruppi" activeClassName="active">Gruppo</NavLink>
                    </li>
                    <li>
                        <NavLink to="/calendario" activeClassName="active">Calendario</NavLink>
                    </li>
                    <li>
                        <NavLink to="/faq" activeClassName="active">Faq</NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-user">
                <ul>
                    <li>
                        <NavLink to="/register" activeClassName="active">User</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
=======
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="data:image/jpeg;base64,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/ORO3+bv863SbEWud9nA7dvC+LpjBbV0xL27OMRANxsdUb7aD6X+5XVY7E8CpMW/2imhlPnJGx5+9wVWSuWOzLHxG8V4vFw00tMQ52wdM4GxPS0bPaP2vvX1lLhpVZodJV4o+WMSNOkGwnc4izXubbwMbtZthew2DRZ1gw3LtHhR1U9JBEfOOJjHfeBdZNJJDLZcvXnijrK3hdVOgqGl8Dzqs32JG9OZCTsHja7SfIH9VyrGG4hT49E2WJzJWH0vY+Tgd2uHkd1nsewOnzBC6CpjD2Hfyc09nNcN2uHmFHcV4aYnlaQzYXM6Rp/dc1k9vJ7HeCUDf/5WXHq9e7nyqk94jBLiAACST0AG5JUm4cRHNWOS1lrxxOkmv6EGKAH107/YK69W3MeZm/JXwTBrrB94hAxw+nI4AFvmG9fI9FW+H+UWZQpuXcPlkOqV46OdawDfoNGw+J7pjjxu3bMvkbOiIqecREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQf/Z"
            alt="Logo"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          ToStudy
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                I miei appunti
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Esplora
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Gruppi
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Faq
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/Login">
                <img
                  src="data:image/png;base64,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"
                  alt="User Logo"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
>>>>>>> 2ba000f55241321a755931344c700a7c686c76c3
}

export default NavBar;
