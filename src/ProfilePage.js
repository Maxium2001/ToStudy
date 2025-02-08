import React from "react";
import { useAuth } from "./Autenticato";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  const { logout, id } = useAuth();
  return (
    <div>
      <header>
        <h1>Profile Page</h1>
      </header>
      <main>
        <section>
          <h2>User Information</h2>
          {/* Add user information here */}
        </section>
        <section>
          <h2>Posts</h2>
          {/* Add user posts here */}
        </section>
        <NavLink to="/">
          <button onClick={logout}>Logout</button>
        </NavLink>
      </main>
      <footer>
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  );
};
export default ProfilePage;
