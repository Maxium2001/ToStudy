<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Register from './Register';
import './index.css';
import AppuntiPage from './AppuntiPage';
import EsploraPage from './EsploraPage';
import GruppiPage from './GruppiPage';
import FaqPage from './FaqPage';
import HomePage from './HomePage';
=======
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Register from "./Register";
import "./index.css";
import Login from "./Login";
import ImageCarousel from "./ImageCarousel";
>>>>>>> 2ba000f55241321a755931344c700a7c686c76c3

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<HomePage />} />
        <Route path="/appunti" element={<AppuntiPage />} />
        <Route path="/esplora" element={<EsploraPage />} />
        <Route path="/gruppi" element={<GruppiPage />} />
        <Route path="/faq" element={<FaqPage />} />
=======
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
>>>>>>> 2ba000f55241321a755931344c700a7c686c76c3
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  </React.StrictMode>,
<<<<<<< HEAD
  document.getElementById('root')
=======
  document.getElementById("root")
>>>>>>> 2ba000f55241321a755931344c700a7c686c76c3
);
