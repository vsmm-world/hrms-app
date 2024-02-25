import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

function Navbar() {
  return (
    <>
      <nav className="navcontainer">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
    </>
  );
}

export default Navbar;
