import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Register from "./Register";
import "./index.css";
import AppuntiPage from "./AppuntiPage";
import EsploraPage from "./EsploraPage";
import GruppiPage from "./GruppiPage";
import FaqPage from "./FaqPage";
import HomePage from "./HomePage";
import ImageCarousel from "./ImageCarousel";
import Login from "./Login";
import TermsAndConditions from "./TermsAndConditions";

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
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/login" element={<div><Login /><ImageCarousel /></div>} />
        <Route path="/register" element={<Register />} />
=======
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
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
>>>>>>> ededa2429e13c8a4594ad5a476b19e248f63a58d
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
