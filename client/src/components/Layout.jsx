import React from "react";
import { Link, useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();

  // Check if the current location is the home page
  const isHomePage = location.pathname === "/";

  return (
    <div>
      <header>
        <nav>
          {!isHomePage && <Link to="/">Home</Link>}
          <Link to="/students">Students</Link>
          <Link to="/add-student">Add Student</Link>
          <Link to="/deactivate-student">Deactivate Student</Link>
          {/* <Link to="/admin">Admin</Link>  this route can be made active if we want to create admin as a separate login + management feature */}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
