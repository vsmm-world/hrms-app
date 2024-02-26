import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useState, useEffect } from "react";

function Navbar() {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    isDeleted: false,
    roleId: "",
  } as any);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setUser({});
    setIsLoggedIn(false);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  };

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch("http://localhost:3000/auth/whoami", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          const dt = await data.user;
          setUser(dt);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Failed to fetch user data", error);
      }
    }
    checkUser();
  }, []); // empty dependency array ensures that useEffect runs only once, after initial render

  return (
    <>
      <nav className="navcontainer">
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>
        <div className="right">
          {!isLoggedIn ? (
            <div>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          ) : (
            <div>
              <NavLink to="/user-dashboard">{user.name}</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
