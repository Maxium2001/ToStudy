import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Register from "./Register";
import "./index.css";
import Login from "./Login";
import ImageCarousel from "./ImageCarousel";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route
          path="/login"
          element={
            <>
              <ImageCarousel />
              <Login />
            </>
          }
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
