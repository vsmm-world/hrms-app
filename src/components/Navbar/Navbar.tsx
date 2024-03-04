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
    Role: {
      name: ""
    }
  } as any);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    setUser({});
    setIsLoggedIn(false);
    const paylod = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${document.cookie.split("=")[1]}`,
      },
    };
    try {
      const response = await fetch("https://api.ravindravaland.co/auth/logout", paylod);
      document.cookie = "token=; expires=Thu, 01 Jan 2024 00:00:00 GMT; path=/";
      sessionStorage.removeItem("user");
      if (response.ok) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.log("Failed to logout", error);
    }
  };

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch("https://api.ravindravaland.co/auth/whoami", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          const dt = await data.user;
          sessionStorage.setItem("user", JSON.stringify(dt));
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
          {/* <NavLink to="/">HRMS Portal</NavLink> */}
          <p className="nav-title">HRMS Portal</p>
        </div>
        <div className="right">
          {!isLoggedIn ? (
            <div>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </div>
          ) : (
            <div>
              {user.Role.name === "admin" && (
                <NavLink to="/admin/dashboard">Admin Dashboard</NavLink>
              )}
              {user.isEmployee && (
                <NavLink to="/employee/dashboard">Employee Dashboard</NavLink>
              )}
              <NavLink to="/user/dashboard">{user.name}</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
