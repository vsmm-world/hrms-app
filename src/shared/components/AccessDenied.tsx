import { useEffect, useState } from "react";
import "./AccessDenied.css";

function AccessDenied() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    isDeleted: false,
    isEmployee: false,
    roleId: "",
  } as any);
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
        setIsLoggedIn(true);

        if (response.ok) {
          const dt = await data.user;
          const role = await data.user.Role.name;
          if (role === "admin") {
            setIsAdmin(true);
          }
          setUser(dt);
        }


      } catch (error) {
        console.log("Failed to fetch user data", error);
      }
    }
    checkUser();
  }, []);


  return (
    <div className="access-denied">
      <h1 className="access-denied__title">Access Denied</h1>
      <p className="access-denied__message">Sorry, you do not have permission to access this page.</p>
      <p className="access-denied__message">Please contact your administrator for further assistance.</p>
      <p className="access-denied__message">If you believe this is a mistake, you can <a href="/login" className="access-denied__link">login</a> to gain access.</p>
    </div>
  );
}

export default AccessDenied;
