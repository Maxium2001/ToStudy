import React from "react";
import ReactDOM from "react-dom";
import "./Style.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
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
import PasswordReset from "./ResetPassword";
import { AuthProvider } from "./Autenticato";
import ProfiloPage from "./ProfiloPage";

const App = () => {
  const location = useLocation();
  const hideNavBarPaths = ["/login", "/register"];

  return (
    <>
      {!hideNavBarPaths.includes(location.pathname) && <NavBar />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/appunti" element={<AppuntiPage />} />
        <Route path="/esplora" element={<EsploraPage />} />
        <Route path="/gruppi" element={<GruppiPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/profilo" element={<ProfiloPage />} />
        <Route
          path="/login"
          element={
            <div className="page">
              <div className="carousel-section">
                <ImageCarousel /> {/* Carosello a sinistra */}
              </div>
              <div className="section">
                <Login /> {/* Modulo di login a destra */}
              </div>
            </div>
          }
        />
        <Route
          path="/register"
          element={
            <div className="page">
              <div className="carousel-section">
                <ImageCarousel /> {/* Carosello a sinistra */}
              </div>
              <div className="section">
                <Register /> {/* Modulo di registrazione a destra */}
              </div>
            </div>
          }
        />
        <Route path="/termsandconditions" element={<TermsAndConditions />} />
        <Route path="/passworddimenticata" element={<PasswordDimenticata />} />
        <Route path="/resetpassword" element={<PasswordReset />} />
      </Routes>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
