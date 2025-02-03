import React from "react";
import ReactDOM from "react-dom";
import "./Style.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Register from "./Register";
import AppuntiPage from "./AppuntiPage";
import EsploraPage from "./EsploraPage";
import GruppiPage from "./GruppiPage";
import FaqPage from "./FaqPage";
import HomePage from "./HomePage";
import ImageCarousel from "./ImageCarousel";
import Login from "./Login";
import TermsAndConditions from "./TermsAndConditions";
import PasswordDimenticata from "./PasswordDimenticata";
import ConfermaOtp from "./ConfermaOtp";

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
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
