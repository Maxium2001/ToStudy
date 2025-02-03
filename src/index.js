import React from "react";
import ReactDOM from "react-dom";
import "./Style.css";
import './Function.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Register from "./Register";
import AppuntiPage from "./AppuntiPage";
import EsploraPage from "./EsploraPage";
import GruppiPage from "./GruppiPage";
import FaqPage from "./FaqPage";
import HomePage from "./HomePage";
import "./index.css";
import ImageCarousel from "./ImageCarousel";
import Login from "./Login";
<<<<<<< HEAD
import TermsAndConditions from "./TermsAndConditions";
import PasswordDimenticata from "./PasswordDimenticata";
import ConfermaOtp from "./ConfermaOtp";
=======
>>>>>>> ea78fd7e0c8f194accb38f887532f37cef6cafd2

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/appunti" element={<AppuntiPage />} />
        <Route path="/esplora" element={<EsploraPage />} />
        <Route path="/gruppi" element={<GruppiPage />} />
        <Route path="/faq" element={<FaqPage />} />
<<<<<<< HEAD
        <Route
          path="/login"
          element={
            <>
              {/* <ImageCarousel /> */}
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              {/* <ImageCarousel /> */}
              <Register />
            </>
          }
        />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/passworddimenticata" element={<PasswordDimenticata />} />
        <Route path="/confermaotp" element={<ConfermaOtp />} />
=======
        <Route path="/login" element={
          <div className="page">
            <div className="carousel-section">
              <ImageCarousel /> {/* Carosello a sinistra */}
            </div>
            <div className="section">
              <Login /> {/* Modulo di login a destra */}
            </div>
          </div>
        } />
        <Route path="/register" element={
          <div className="page">
            <div className="carousel-section">
              <ImageCarousel /> {/* Carosello a sinistra */}
            </div>
            <div className="section">
              <Register /> {/* Modulo di registrazione a destra */}
            </div>
          </div>
        } />
>>>>>>> ea78fd7e0c8f194accb38f887532f37cef6cafd2
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

